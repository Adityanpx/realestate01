"use client";

import React, { useState, useMemo } from 'react';
import { FileText, Calendar, DollarSign, TrendingUp, Download } from 'lucide-react';

interface LeaseResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  paymentSchedule: {
    month: number;
    year: number;
    basePayment: number;
    escalatedPayment: number;
    cumulativePayment: number;
  }[];
  yearlyBreakdown: {
    year: number;
    totalPayments: number;
    avgMonthlyPayment: number;
  }[];
}

export default function LeaseCalculator() {
  const [propertyValue, setPropertyValue] = useState<string>('5000000');
  const [advanceRent, setAdvanceRent] = useState<string>('35000');
  const [leaseTenure, setLeaseTenure] = useState<string>('10');
  const [escalationRate, setEscalationRate] = useState<string>('5');
  const [escalationFrequency, setEscalationFrequency] = useState<string>('12'); // months
  const [interestRate, setInterestRate] = useState<string>('8.5');
  const [maintenanceCharges, setMaintenanceCharges] = useState<string>('5000');
  const [taxRate, setTaxRate] = useState<string>('18');
  const [showSchedule, setShowSchedule] = useState(false);

  const result = useMemo<LeaseResult | null>(() => {
    const propValue = parseFloat(propertyValue);
    const advance = parseFloat(advanceRent);
    const tenure = parseInt(leaseTenure);
    const escRate = parseFloat(escalationRate) / 100;
    const escFreq = parseInt(escalationFrequency);
    const intRate = parseFloat(interestRate) / 100;
    const maint = parseFloat(maintenanceCharges);
    const tax = parseFloat(taxRate) / 100;
    const totalMonths = tenure * 12;

    if (!propValue || !advance || !tenure || !escRate) return null;

    // Calculate base monthly lease amount (typically 0.8-1.2% of property value)
    const baseMonthlyLease = propValue * 0.01; // 1% of property value
    const basePayment = baseMonthlyLease + maint; // Including maintenance

    const paymentSchedule = [];
    const yearlyBreakdown = [];
    let currentPayment = basePayment;
    let cumulativePayment = 0;
    let yearlyPayment = 0;

    for (let month = 1; month <= totalMonths; month++) {
      // Apply escalation at specified frequency
      if (month > 1 && month % escFreq === 0) {
        currentPayment *= (1 + escRate);
      }

      // Calculate taxes and total payment
      const leaseAmount = currentPayment - maint; // Remove maintenance to get actual lease
      const taxAmount = leaseAmount * tax;
      const totalPayment = currentPayment + taxAmount;

      cumulativePayment += totalPayment;
      yearlyPayment += totalPayment;

      paymentSchedule.push({
        month,
        year: Math.ceil(month / 12),
        basePayment: currentPayment,
        escalatedPayment: totalPayment,
        cumulativePayment
      });

      // Yearly breakdown
      if (month % 12 === 0) {
        yearlyBreakdown.push({
          year: month / 12,
          totalPayments: yearlyPayment,
          avgMonthlyPayment: yearlyPayment / 12
        });
        yearlyPayment = 0;
      }
    }

    // Calculate additional metrics
    const totalPayment = cumulativePayment;
    const totalInterest = totalPayment - (baseMonthlyLease * totalMonths); // Simplified interest calculation
    const monthlyPayment = currentPayment; // Final escalated monthly payment

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      paymentSchedule,
      yearlyBreakdown
    };
  }, [propertyValue, advanceRent, leaseTenure, escalationRate, escalationFrequency, interestRate, maintenanceCharges, taxRate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const exportSchedule = () => {
    if (!result) return;
    
    const csvContent = [
      ['Month', 'Year', 'Base Payment (₹)', 'Total Payment (₹)', 'Cumulative (₹)'],
      ...result.paymentSchedule.map(item => [
        item.month,
        item.year,
        Math.round(item.basePayment),
        Math.round(item.escalatedPayment),
        Math.round(item.cumulativePayment)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lease_payment_schedule.csv';
    a.click();
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <FileText className="text-primary w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Lease Calculator</h2>
          <p className="text-muted-foreground text-sm">Plan lease payments with escalation and tenure analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground">Property & Lease Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Property Value (₹)
              </label>
              <input
                type="number"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="50,00,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Advance Rent (₹)
              </label>
              <input
                type="number"
                value={advanceRent}
                onChange={(e) => setAdvanceRent(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="35,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Lease Tenure (Years)
              </label>
              <input
                type="number"
                value={leaseTenure}
                onChange={(e) => setLeaseTenure(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Escalation Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={escalationRate}
                onChange={(e) => setEscalationRate(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="5"
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8">Additional Charges</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Escalation Frequency (Months)
              </label>
              <select
                value={escalationFrequency}
                onChange={(e) => setEscalationFrequency(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              >
                <option value="12">Annual</option>
                <option value="24">Bi-annual</option>
                <option value="36">Every 3 Years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Maintenance Charges (₹/month)
              </label>
              <input
                type="number"
                value={maintenanceCharges}
                onChange={(e) => setMaintenanceCharges(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="5,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tax Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="18"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Interest Rate (% for calculation)
              </label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="8.5"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            <div className="bg-secondary rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Lease Payment Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Monthly Payment (Final):
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(result.monthlyPayment)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Payment:</span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(result.totalPayment)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total with Escalation:</span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(result.totalInterest)}
                  </span>
                </div>
              </div>
            </div>

            {/* Yearly Breakdown */}
            <div className="bg-secondary rounded-xl p-6">
              <h4 className="text-lg font-bold text-foreground mb-4">Yearly Payment Breakdown</h4>
              <div className="space-y-3">
                {result.yearlyBreakdown.map((year) => (
                  <div key={year.year} className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <div>
                      <span className="text-foreground font-semibold">Year {year.year}</span>
                      <div className="text-sm text-muted-foreground">
                        Avg: {formatCurrency(year.avgMonthlyPayment)}/month
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-foreground font-bold">
                        {formatCurrency(year.totalPayments)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSchedule(!showSchedule)}
                className="flex-1 bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                {showSchedule ? 'Hide' : 'Show'} Payment Schedule
              </button>
              <button
                onClick={exportSchedule}
                className="bg-secondary text-secondary-foreground font-semibold py-3 px-4 rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Payment Schedule */}
            {showSchedule && (
              <div className="bg-secondary rounded-xl p-6">
                <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Monthly Payment Schedule
                </h4>
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-secondary">
                      <tr className="border-b border-border">
                        <th className="text-left p-2 text-foreground">Month</th>
                        <th className="text-right p-2 text-foreground">Base Payment</th>
                        <th className="text-right p-2 text-foreground">Total Payment</th>
                        <th className="text-right p-2 text-foreground">Cumulative</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.paymentSchedule.map((item) => (
                        <tr key={item.month} className="border-b border-border/50">
                          <td className="p-2 text-muted-foreground">
                            {item.month} (Y{item.year})
                          </td>
                          <td className="p-2 text-right text-foreground">
                            {formatCurrency(item.basePayment)}
                          </td>
                          <td className="p-2 text-right text-foreground">
                            {formatCurrency(item.escalatedPayment)}
                          </td>
                          <td className="p-2 text-right text-foreground">
                            {formatCurrency(item.cumulativePayment)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}