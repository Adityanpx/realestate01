"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, Download, TrendingUp } from 'lucide-react';

interface EMIResult {
  monthlyEMI: number;
  totalInterest: number;
  totalAmount: number;
  amortizationSchedule: {
    month: number;
    principal: number;
    interest: number;
    balance: number;
  }[];
}

export default function EMICalculator() {
  const [principal, setPrincipal] = useState<string>('2500000');
  const [interestRate, setInterestRate] = useState<string>('8.5');
  const [loanTenure, setLoanTenure] = useState<string>('20');
  const [showSchedule, setShowSchedule] = useState(false);

  const result = useMemo<EMIResult | null>(() => {
    const P = parseFloat(principal);
    const r = parseFloat(interestRate) / (12 * 100);
    const n = parseFloat(loanTenure) * 12;

    if (!P || !r || !n) return null;

    const emi = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    // Generate amortization schedule for first 12 months
    const schedule = [];
    let balance = P;
    
    for (let month = 1; month <= Math.min(12, n); month++) {
      const interestPayment = balance * r;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;
      
      schedule.push({
        month,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }

    return {
      monthlyEMI: emi,
      totalInterest,
      totalAmount,
      amortizationSchedule: schedule
    };
  }, [principal, interestRate, loanTenure]);

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
      ['Month', 'Principal (₹)', 'Interest (₹)', 'Balance (₹)'],
      ...result.amortizationSchedule.map(item => [
        item.month,
        Math.round(item.principal),
        Math.round(item.interest),
        Math.round(item.balance)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emi_schedule.csv';
    a.click();
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Calculator className="text-primary w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">EMI Calculator</h2>
          <p className="text-muted-foreground text-sm">Calculate your home loan EMI with amortization schedule</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              placeholder="25,00,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Interest Rate (% per annum)
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
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            <div className="bg-secondary rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">EMI Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monthly EMI:</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(result.monthlyEMI)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Interest:</span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(result.totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(result.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSchedule(!showSchedule)}
                className="flex-1 bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                {showSchedule ? 'Hide' : 'Show'} Schedule
              </button>
              <button
                onClick={exportSchedule}
                className="bg-secondary text-secondary-foreground font-semibold py-3 px-4 rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Amortization Schedule */}
            {showSchedule && (
              <div className="bg-secondary rounded-xl p-6">
                <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Amortization Schedule (First 12 months)
                </h4>
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-secondary">
                      <tr className="border-b border-border">
                        <th className="text-left p-2 text-foreground">Month</th>
                        <th className="text-right p-2 text-foreground">Principal</th>
                        <th className="text-right p-2 text-foreground">Interest</th>
                        <th className="text-right p-2 text-foreground">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.amortizationSchedule.map((item) => (
                        <tr key={item.month} className="border-b border-border/50">
                          <td className="p-2 text-muted-foreground">{item.month}</td>
                          <td className="p-2 text-right text-foreground">
                            {formatCurrency(item.principal)}
                          </td>
                          <td className="p-2 text-right text-foreground">
                            {formatCurrency(item.interest)}
                          </td>
                          <td className="p-2 text-right text-foreground">
                            {formatCurrency(item.balance)}
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