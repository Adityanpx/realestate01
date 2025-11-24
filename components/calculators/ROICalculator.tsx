"use client";

import React, { useState, useMemo } from 'react';
import { TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react';

interface ROIResult {
  annualROI: number;
  totalROI: number;
  totalReturn: number;
  cashFlowAnalysis: {
    year: number;
    rentalIncome: number;
    totalExpenses: number;
    netCashFlow: number;
    cumulativeCashFlow: number;
  }[];
}

export default function ROICalculator() {
  const [propertyValue, setPropertyValue] = useState<string>('5000000');
  const [downPayment, setDownPayment] = useState<string>('1000000');
  const [loanAmount, setLoanAmount] = useState<string>('4000000');
  const [interestRate, setInterestRate] = useState<string>('8.5');
  const [loanTenure, setLoanTenure] = useState<string>('20');
  const [monthlyRent, setMonthlyRent] = useState<string>('35000');
  const [annualAppreciation, setAnnualAppreciation] = useState<string>('6');
  const [annualExpenses, setAnnualExpenses] = useState<string>('60000');
  const [vacancyRate, setVacancyRate] = useState<string>('5');
  const [analysisYears, setAnalysisYears] = useState<string>('10');

  const result = useMemo<ROIResult | null>(() => {
    const propValue = parseFloat(propertyValue);
    const downPay = parseFloat(downPayment);
    const loanAmt = parseFloat(loanAmount);
    const intRate = parseFloat(interestRate) / 100;
    const loanTnr = parseFloat(loanTenure);
    const mRent = parseFloat(monthlyRent);
    const apprRate = parseFloat(annualAppreciation) / 100;
    const exp = parseFloat(annualExpenses);
    const vacancy = parseFloat(vacancyRate) / 100;
    const years = parseInt(analysisYears);

    if (!propValue || !downPay || !loanAmt || !intRate || !loanTnr || !mRent || !apprRate || !exp) return null;

    // Calculate EMI
    const monthlyRate = intRate / 12;
    const emi = loanAmt * (monthlyRate * Math.pow(1 + monthlyRate, loanTnr * 12)) / (Math.pow(1 + monthlyRate, loanTnr * 12) - 1);

    // Generate cash flow analysis
    const cashFlowAnalysis = [];
    let cumulativeCashFlow = -downPay; // Initial investment
    let currentPropertyValue = propValue;

    for (let year = 1; year <= years; year++) {
      const effectiveRent = mRent * 12 * (1 - vacancy);
      const propertyTax = currentPropertyValue * 0.02; // 2% property tax
      const maintenance = mRent * 12 * 0.05; // 5% maintenance
      const totalExpenses = exp + emi * 12 + propertyTax + maintenance;
      const netCashFlow = effectiveRent - totalExpenses;
      cumulativeCashFlow += netCashFlow;
      
      cashFlowAnalysis.push({
        year,
        rentalIncome: effectiveRent,
        totalExpenses,
        netCashFlow,
        cumulativeCashFlow
      });

      currentPropertyValue *= (1 + apprRate);
    }

    // Calculate final year property value and total return
    const finalPropertyValue = currentPropertyValue;
    const totalReturn = cumulativeCashFlow + finalPropertyValue;
    const totalROI = (totalReturn - downPay) / downPay * 100;
    const annualROI = Math.pow(1 + totalROI / 100, 1 / years) - 1;

    return {
      annualROI: annualROI * 100,
      totalROI,
      totalReturn,
      cashFlowAnalysis
    };
  }, [propertyValue, downPayment, loanAmount, interestRate, loanTenure, monthlyRent, annualAppreciation, annualExpenses, vacancyRate, analysisYears]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <TrendingUp className="text-primary w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">ROI Calculator</h2>
          <p className="text-muted-foreground text-sm">Analyze investment returns for rental properties</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground">Property Details</h3>
          
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
                Down Payment (₹)
              </label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="10,00,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Monthly Rent (₹)
              </label>
              <input
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="35,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Annual Appreciation (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={annualAppreciation}
                onChange={(e) => setAnnualAppreciation(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="6"
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8">Financing & Expenses</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Interest Rate (%)
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

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Loan Tenure (Years)
              </label>
              <input
                type="number"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Annual Expenses (₹)
              </label>
              <input
                type="number"
                value={annualExpenses}
                onChange={(e) => setAnnualExpenses(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="60,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Vacancy Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={vacancyRate}
                onChange={(e) => setVacancyRate(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Analysis Period (Years)
            </label>
            <input
              type="number"
              value={analysisYears}
              onChange={(e) => setAnalysisYears(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              placeholder="10"
            />
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            <div className="bg-secondary rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Investment Returns</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Percent className="w-4 h-4" />
                    Annual ROI:
                  </span>
                  <span className={`text-2xl font-bold ${result.annualROI >= 10 ? 'text-green-500' : result.annualROI >= 5 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {formatPercentage(result.annualROI)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total ROI:</span>
                  <span className="font-semibold text-foreground">
                    {formatPercentage(result.totalROI)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Total Return:
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(result.totalReturn)}
                  </span>
                </div>
              </div>
            </div>

            {/* Cash Flow Table */}
            <div className="bg-secondary rounded-xl p-6">
              <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Cash Flow Analysis
              </h4>
              <div className="max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-secondary">
                    <tr className="border-b border-border">
                      <th className="text-left p-2 text-foreground">Year</th>
                      <th className="text-right p-2 text-foreground">Rental Income</th>
                      <th className="text-right p-2 text-foreground">Expenses</th>
                      <th className="text-right p-2 text-foreground">Net Cash Flow</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.cashFlowAnalysis.map((item) => (
                      <tr key={item.year} className="border-b border-border/50">
                        <td className="p-2 text-muted-foreground">{item.year}</td>
                        <td className="p-2 text-right text-foreground">
                          {formatCurrency(item.rentalIncome)}
                        </td>
                        <td className="p-2 text-right text-foreground">
                          {formatCurrency(item.totalExpenses)}
                        </td>
                        <td className={`p-2 text-right font-semibold ${item.netCashFlow >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {formatCurrency(item.netCashFlow)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}