"use client";

import React, { useState, useMemo } from 'react';
import { Home, Calculator, DollarSign, Percent, TrendingUp } from 'lucide-react';

interface YieldResult {
  grossYield: number;
  netYield: number;
  annualRentalIncome: number;
  totalAnnualExpenses: number;
  netAnnualIncome: number;
  monthlyRent: number;
  propertyValue: number;
}

export default function RentalYieldCalculator() {
  const [propertyValue, setPropertyValue] = useState<string>('5000000');
  const [monthlyRent, setMonthlyRent] = useState<string>('35000');
  const [annualAppreciation, setAnnualAppreciation] = useState<string>('6');
  const [rentEscalation, setRentEscalation] = useState<string>('5');
  const [annualExpenses, setAnnualExpenses] = useState<string>('60000');
  const [vacancyRate, setVacancyRate] = useState<string>('5');
  const [maintenanceCost, setMaintenanceCost] = useState<string>('25000');
  const [insuranceCost, setInsuranceCost] = useState<string>('15000');
  const [propertyTax, setPropertyTax] = useState<string>('20000');
  const [managementFees, setManagementFees] = useState<string>('12000');
  const [analysisYears, setAnalysisYears] = useState<string>('10');

  const result = useMemo<YieldResult | null>(() => {
    const propValue = parseFloat(propertyValue);
    const mRent = parseFloat(monthlyRent);
    const apprRate = parseFloat(annualAppreciation) / 100;
    const escRate = parseFloat(rentEscalation) / 100;
    const exp = parseFloat(annualExpenses);
    const vacancy = parseFloat(vacancyRate) / 100;
    const maint = parseFloat(maintenanceCost);
    const insurance = parseFloat(insuranceCost);
    const tax = parseFloat(propertyTax);
    const mgtFees = parseFloat(managementFees);
    const years = parseInt(analysisYears);

    if (!propValue || !mRent) return null;

    // Calculate effective rental income considering vacancy
    const grossAnnualRent = mRent * 12;
    const effectiveAnnualRent = grossAnnualRent * (1 - vacancy);

    // Calculate total annual expenses
    const totalExpenses = maint + insurance + tax + mgtFees + exp;
    
    // Calculate net annual income
    const netAnnualIncome = effectiveAnnualRent - totalExpenses;

    // Calculate yields
    const grossYield = (grossAnnualRent / propValue) * 100;
    const netYield = (netAnnualIncome / propValue) * 100;

    // Calculate multi-year projections with appreciation and rent escalation
    const projections = [];
    let currentRent = mRent;
    let currentPropertyValue = propValue;

    for (let year = 1; year <= years; year++) {
      const yearlyRent = currentRent * 12;
      const effectiveRent = yearlyRent * (1 - vacancy);
      const yearlyExpenses = maint + insurance + tax + mgtFees + exp;
      const netIncome = effectiveRent - yearlyExpenses;
      const currentNetYield = (netIncome / currentPropertyValue) * 100;

      projections.push({
        year,
        rent: currentRent,
        propertyValue: currentPropertyValue,
        effectiveRent,
        netIncome,
        netYield: currentNetYield
      });

      // Escalate rent and property value for next year
      currentRent *= (1 + escRate);
      currentPropertyValue *= (1 + apprRate);
    }

    return {
      grossYield,
      netYield,
      annualRentalIncome: effectiveAnnualRent,
      totalAnnualExpenses: totalExpenses,
      netAnnualIncome,
      monthlyRent: mRent,
      propertyValue: propValue
    };
  }, [propertyValue, monthlyRent, annualAppreciation, rentEscalation, annualExpenses, vacancyRate, maintenanceCost, insuranceCost, propertyTax, managementFees, analysisYears]);

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
          <Home className="text-primary w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Rental Yield Calculator</h2>
          <p className="text-muted-foreground text-sm">Calculate gross and net rental yields for investment properties</p>
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

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Rent Escalation (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={rentEscalation}
                onChange={(e) => setRentEscalation(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="5"
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-8">Expenses Breakdown</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Maintenance Cost (₹/year)
              </label>
              <input
                type="number"
                value={maintenanceCost}
                onChange={(e) => setMaintenanceCost(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="25,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Insurance (₹/year)
              </label>
              <input
                type="number"
                value={insuranceCost}
                onChange={(e) => setInsuranceCost(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="15,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Property Tax (₹/year)
              </label>
              <input
                type="number"
                value={propertyTax}
                onChange={(e) => setPropertyTax(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="20,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Management Fees (₹/year)
              </label>
              <input
                type="number"
                value={managementFees}
                onChange={(e) => setManagementFees(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="12,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Other Expenses (₹/year)
              </label>
              <input
                type="number"
                value={annualExpenses}
                onChange={(e) => setAnnualExpenses(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="60,000"
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
              <h3 className="text-lg font-bold text-foreground mb-4">Rental Yield Analysis</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Percent className="w-4 h-4" />
                    Gross Yield:
                  </span>
                  <span className={`text-2xl font-bold ${result.grossYield >= 8 ? 'text-green-500' : result.grossYield >= 5 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {formatPercentage(result.grossYield)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Net Yield:</span>
                  <span className={`text-xl font-semibold ${result.netYield >= 6 ? 'text-green-500' : result.netYield >= 3 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {formatPercentage(result.netYield)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Net Annual Income:
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(result.netAnnualIncome)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-secondary rounded-xl p-6">
              <h4 className="text-lg font-bold text-foreground mb-4">Income & Expenses Breakdown</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Annual Rental Income:</span>
                  <span className="text-green-500 font-semibold">{formatCurrency(result.annualRentalIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Annual Expenses:</span>
                  <span className="text-red-500 font-semibold">-{formatCurrency(result.totalAnnualExpenses)}</span>
                </div>
                <div className="border-t border-border pt-2">
                  <div className="flex justify-between">
                    <span className="text-foreground font-semibold">Net Annual Income:</span>
                    <span className="text-primary font-bold">{formatCurrency(result.netAnnualIncome)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary rounded-xl p-6">
              <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Yield Comparison
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{formatPercentage(result.grossYield)}</div>
                  <div className="text-sm text-muted-foreground">Gross Yield</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{formatPercentage(result.netYield)}</div>
                  <div className="text-sm text-muted-foreground">Net Yield</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-background rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Yield Difference</div>
                <div className="text-lg font-semibold text-foreground">
                  {formatPercentage(result.grossYield - result.netYield)} expense ratio
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}