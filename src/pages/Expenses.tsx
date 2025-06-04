import React from 'react';
import { DollarSign, Receipt, PieChart, TrendingUp } from 'lucide-react';

const Expenses: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="bg-secondary-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <DollarSign className="h-12 w-12 text-secondary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Shared Expenses</h2>
        <p className="text-gray-600 mb-6">
          Coming soon! This will be your shared expense tracker to manage 
          child-related costs and split expenses fairly.
        </p>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Planned Features:</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start space-x-3">
              <Receipt className="h-5 w-5 text-secondary-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Receipt Tracking</p>
                <p className="text-sm text-gray-600">Upload and categorize child-related expenses</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <PieChart className="h-5 w-5 text-secondary-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Expense Splitting</p>
                <p className="text-sm text-gray-600">Automatically calculate fair splits</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <TrendingUp className="h-5 w-5 text-secondary-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Budget Insights</p>
                <p className="text-sm text-gray-600">Track spending patterns and budgets</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          We're working hard to bring you this feature. Stay tuned!
        </div>
      </div>
    </div>
  );
};

export default Expenses;