import React from 'react';
import { Calendar as CalendarIcon, Clock, Users } from 'lucide-react';

const Calendar: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="bg-primary-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <CalendarIcon className="h-12 w-12 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Shared Calendar</h2>
        <p className="text-gray-600 mb-6">
          Coming soon! This will be your shared calendar where you can coordinate 
          schedules, custody arrangements, and important events.
        </p>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Planned Features:</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-primary-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Custody Schedule</p>
                <p className="text-sm text-gray-600">Track custody arrangements and transitions</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-primary-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Shared Events</p>
                <p className="text-sm text-gray-600">School events, appointments, and activities</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CalendarIcon className="h-5 w-5 text-primary-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Reminders</p>
                <p className="text-sm text-gray-600">Automated reminders for important dates</p>
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

export default Calendar;