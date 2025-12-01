import { AlertTriangle, Calendar, DollarSign, CheckCircle, X, TrendingDown, Users, Award, FileCheck, Activity, PieChart, Download, Table } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PaymentFormData } from '../common/PaymentForm';

export function CoordinatorDashboard() {
  const [showToast, setShowToast] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'penalties' | 'scheduler' | 'payments'>('dashboard');

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const penalties = [
    {
      student: 'Bilal Ahmed',
      group: 'Group 12',
      violation: 'Missed Monthly Log #2',
      deadline: '15 Nov 2025',
      penalty: 'Rs. 500',
    },
    {
      student: 'Fatima Khan',
      group: 'Group 24',
      violation: 'Late SRS Submission',
      deadline: '20 Nov 2025',
      penalty: 'Rs. 300',
    },
    {
      student: 'Hassan Ali',
      group: 'Group 31',
      violation: 'Missed Supervisor Meeting',
      deadline: '18 Nov 2025',
      penalty: 'Rs. 200',
    },
  ];

  const defenseSlots = [
    { time: '09:00 AM', room: '404', group: 'Group 101', status: 'booked' },
    { time: '10:00 AM', room: '404', group: 'Group 102', status: 'conflict' },
    { time: '11:00 AM', room: '404', group: null, status: 'available' },
    { time: '12:00 PM', room: '404', group: 'Group 103', status: 'booked' },
    { time: '02:00 PM', room: '405', group: null, status: 'available' },
    { time: '03:00 PM', room: '405', group: 'Group 104', status: 'booked' },
  ];

  const phaseDistribution = [
    { phase: 'Phase 1', count: 25, color: '#EF4444' },
    { phase: 'Phase 2', count: 35, color: '#F59E0B' },
    { phase: 'Phase 3', count: 40, color: '#1F3B73' },
    { phase: 'Phase 4', count: 30, color: '#34D399' },
    { phase: 'Phase 5', count: 10, color: '#10b981' },
  ];

  const systemHealth = [
    { metric: 'Submission Rate', value: 92, status: 'good' },
    { metric: 'Supervisor Response', value: 78, status: 'warning' },
    { metric: 'On-Time Completion', value: 85, status: 'good' },
    { metric: 'Quality Score', value: 88, status: 'good' },
  ];

  const paymentSubmissions: PaymentFormData[] = [
    {
      fullName: 'Dr. Ahmed Malik',
      cnic: '42301-1234567-1',
      ntn: 'NTN-123456',
      accountNumber: '1234567890123',
      bankName: 'HBL',
      title: 'Project Supervisor',
      role: 'Supervisor',
      amount: 'Rs. 50,000',
    },
    {
      fullName: 'Dr. Ayesha Siddiqui',
      cnic: '42301-9876543-2',
      ntn: 'NTN-789012',
      accountNumber: '9876543210987',
      bankName: 'UBL',
      title: 'Project Supervisor',
      role: 'Supervisor',
      amount: 'Rs. 50,000',
    },
    {
      fullName: 'Dr. Imran Hassan',
      cnic: '42301-5555555-3',
      ntn: 'NTN-555555',
      accountNumber: '5555555555555',
      bankName: 'Meezan',
      title: 'External Evaluator',
      role: 'Evaluator',
      amount: 'Rs. 25,000',
    },
  ];

  const defenseSchedule = [
    { date: 'Dec 5, 2025', time: '09:00 AM', room: '404', group: 'Group 101', students: 'Ali Hassan, Sara Khan', supervisor: 'Dr. Ahmed Malik', evaluator: 'Dr. Imran Hassan' },
    { date: 'Dec 5, 2025', time: '10:00 AM', room: '404', group: 'Group 102', students: 'Bilal Ahmed, Fatima Ali', supervisor: 'Dr. Ayesha Siddiqui', evaluator: 'Dr. Zainab Imran' },
    { date: 'Dec 5, 2025', time: '11:00 AM', room: '405', group: 'Group 103', students: 'Hassan Raza, Maryam Khan', supervisor: 'Dr. Muhammad Rashid', evaluator: 'Dr. Imran Hassan' },
    { date: 'Dec 6, 2025', time: '09:00 AM', room: '404', group: 'Group 104', students: 'Usman Ali, Ayesha Malik', supervisor: 'Dr. Ahmed Malik', evaluator: 'Dr. Zainab Imran' },
    { date: 'Dec 6, 2025', time: '10:00 AM', room: '405', group: 'Group 105', students: 'Ahmed Bilal, Sara Fatima', supervisor: 'Dr. Imran Malik', evaluator: 'Dr. Imran Hassan' },
  ];

  return (
    <div className="p-5 h-full overflow-hidden flex flex-col">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 bg-white shadow-2xl rounded-lg p-4 flex items-start gap-3 max-w-md z-50 border-l-4 border-[#EF4444] animate-slide-in">
          <AlertTriangle className="text-[#EF4444] flex-shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <p className="text-sm text-gray-900">System Auto-Rejected Group 12 Submission</p>
            <p className="text-xs text-gray-600 mt-1">Plagiarism detected: 45%</p>
          </div>
          <button onClick={() => setShowToast(false)} className="text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Top KPI Cards */}
      <div className="grid grid-cols-6 gap-3 mb-4">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-1">
            <Users size={18} className="text-gray-400" />
            <TrendingDown size={14} className="text-green-500" />
          </div>
          <div className="text-2xl text-gray-900 mb-0.5">140</div>
          <div className="text-xs text-gray-600">Total Groups</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-3 shadow-md border border-green-200">
          <div className="flex items-center justify-between mb-1">
            <Award size={18} className="text-[#34D399]" />
          </div>
          <div className="text-2xl text-[#34D399] mb-0.5">45</div>
          <div className="text-xs text-gray-600">Defense Ready</div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-white rounded-lg p-3 shadow-md border-l-4 border-[#EF4444]">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="text-[#EF4444]" size={18} />
          </div>
          <div className="text-2xl text-[#EF4444] mb-0.5">8</div>
          <div className="text-xs text-gray-600">Critical Alerts</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-3 shadow-md border border-blue-200">
          <div className="flex items-center justify-between mb-1">
            <Calendar size={18} className="text-[#1F3B73]" />
          </div>
          <div className="text-2xl text-[#1F3B73] mb-0.5">12</div>
          <div className="text-xs text-gray-600">Rooms Booked</div>
        </div>
        <div className="col-span-2 bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] rounded-lg p-3 shadow-md text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs opacity-90 mb-1">Overall Compliance</div>
              <div className="text-2xl">87%</div>
            </div>
            <Activity size={28} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveView('dashboard')}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            activeView === 'dashboard'
              ? 'bg-[#1F3B73] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          Analytics Dashboard
        </button>
        <button
          onClick={() => setActiveView('scheduler')}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            activeView === 'scheduler'
              ? 'bg-[#1F3B73] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <Table size={14} className="inline mr-1" />
          Defense Schedule
        </button>
        <button
          onClick={() => setActiveView('payments')}
          className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
            activeView === 'payments'
              ? 'bg-[#1F3B73] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <DollarSign size={14} />
          Payment Forms
          <span className="px-1.5 py-0.5 bg-[#34D399] text-white rounded-full text-xs">{paymentSubmissions.length}</span>
        </button>
        <button
          onClick={() => setActiveView('penalties')}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            activeView === 'penalties'
              ? 'bg-[#1F3B73] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          Penalty Manager
        </button>
      </div>

      {/* Content Based on Active View */}
      {activeView === 'dashboard' && (
        <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
          {/* Phase Distribution */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <PieChart size={18} className="text-[#1F3B73]" />
              <h3 className="text-gray-900 text-sm">Phase Distribution</h3>
            </div>
            <div className="flex-1 space-y-3 overflow-auto">
              {phaseDistribution.map((item) => (
                <div key={item.phase} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-700">{item.phase}</span>
                    <span className="text-gray-900">{item.count} groups</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${(item.count / 140) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Activity size={18} className="text-[#1F3B73]" />
              <h3 className="text-gray-900 text-sm">System Health Metrics</h3>
            </div>
            <div className="flex-1 space-y-3 overflow-auto">
              {systemHealth.map((item) => (
                <div key={item.metric} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-700">{item.metric}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        item.status === 'good'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {item.value}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        item.status === 'good'
                          ? 'bg-gradient-to-r from-[#34D399] to-[#10b981]'
                          : 'bg-gradient-to-r from-[#F59E0B] to-[#d97706]'
                      }`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats & Actions */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <FileCheck size={18} className="text-[#1F3B73]" />
              <h3 className="text-gray-900 text-sm">Quick Actions</h3>
            </div>
            <div className="space-y-2 flex-1 overflow-auto">
              <button className="w-full p-3 bg-gradient-to-r from-green-50 to-white rounded-lg border-l-4 border-[#34D399] hover:shadow-sm transition-all text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-900">Approve Pending Groups</div>
                    <div className="text-xs text-gray-500 mt-0.5">12 groups awaiting</div>
                  </div>
                  <CheckCircle className="text-[#34D399]" size={18} />
                </div>
              </button>
              <button className="w-full p-3 bg-gradient-to-r from-blue-50 to-white rounded-lg border-l-4 border-[#1F3B73] hover:shadow-sm transition-all text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-900">Generate Reports</div>
                    <div className="text-xs text-gray-500 mt-0.5">Monthly progress</div>
                  </div>
                  <FileCheck className="text-[#1F3B73]" size={18} />
                </div>
              </button>
              <button className="w-full p-3 bg-gradient-to-r from-yellow-50 to-white rounded-lg border-l-4 border-[#F59E0B] hover:shadow-sm transition-all text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-900">Review Penalties</div>
                    <div className="text-xs text-gray-500 mt-0.5">3 pending decisions</div>
                  </div>
                  <DollarSign className="text-[#F59E0B]" size={18} />
                </div>
              </button>
              <button className="w-full p-3 bg-gradient-to-r from-purple-50 to-white rounded-lg border-l-4 border-purple-500 hover:shadow-sm transition-all text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-900">Schedule Defenses</div>
                    <div className="text-xs text-gray-500 mt-0.5">45 groups ready</div>
                  </div>
                  <Calendar className="text-purple-500" size={18} />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeView === 'penalties' && (
        <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
          {/* Left: Penalty Manager */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center gap-2 bg-gradient-to-r from-white to-gray-50">
              <AlertTriangle size={20} className="text-[#EF4444]" />
              <h2 className="text-gray-900">Student Penalty Manager</h2>
            </div>

            <div className="p-4 overflow-auto flex-1">
              <div className="space-y-3">
                {penalties.map((penalty, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-3 hover:border-[#EF4444] hover:shadow-sm transition-all bg-gradient-to-r from-white to-red-50/20"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm text-gray-900">{penalty.student}</div>
                        <div className="text-xs text-gray-500">{penalty.group}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-[#EF4444]">{penalty.penalty}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      <span className="block">{penalty.violation}</span>
                      <span className="text-gray-500">Deadline: {penalty.deadline}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs hover:bg-gray-50 hover:shadow-sm transition-all">
                        Waive Penalty
                      </button>
                      <button className="flex-1 px-3 py-1.5 bg-gradient-to-r from-[#EF4444] to-[#dc2626] text-white rounded-lg text-xs hover:shadow-md transition-all">
                        Apply Fine
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Penalty Statistics */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
            <h3 className="text-gray-900 mb-4">Student Penalty Statistics</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-2xl text-[#EF4444]">Rs. 12,500</div>
                  <div className="text-xs text-gray-600 mt-1">Total Penalties (Month)</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl text-[#34D399]">Rs. 3,200</div>
                  <div className="text-xs text-gray-600 mt-1">Penalties Waived</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-700 mb-2">Violation Types</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Missed Deadlines</span>
                    <span className="text-gray-900">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-[#EF4444] h-1.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Late Submissions</span>
                    <span className="text-gray-900">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-[#F59E0B] h-1.5 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Other Violations</span>
                    <span className="text-gray-900">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-gray-400 h-1.5 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'scheduler' && (
        /* Defense Scheduler - Spreadsheet Style */
        <div className="bg-white rounded-lg shadow-md border border-gray-200 flex-1 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Table size={20} className="text-[#1F3B73]" />
              <h2 className="text-gray-900">Defense Schedule - Spreadsheet View</h2>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-gradient-to-r from-[#34D399] to-[#10b981] text-white rounded-lg text-xs hover:shadow-md transition-all flex items-center gap-1">
                <Download size={14} />
                Export to Excel
              </button>
              <button className="px-3 py-1.5 bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] text-white rounded-lg text-xs hover:shadow-md transition-all">
                + Add Defense
              </button>
            </div>
          </div>

          <div className="overflow-auto flex-1">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] text-white">
                <tr>
                  <th className="text-left py-3 px-3 text-xs border-r border-white/20">Date</th>
                  <th className="text-left py-3 px-3 text-xs border-r border-white/20">Time</th>
                  <th className="text-left py-3 px-3 text-xs border-r border-white/20">Room</th>
                  <th className="text-left py-3 px-3 text-xs border-r border-white/20">Group</th>
                  <th className="text-left py-3 px-3 text-xs border-r border-white/20">Students</th>
                  <th className="text-left py-3 px-3 text-xs border-r border-white/20">Supervisor</th>
                  <th className="text-left py-3 px-3 text-xs border-r border-white/20">Evaluator</th>
                  <th className="text-left py-3 px-3 text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {defenseSchedule.map((defense, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-blue-50/30 transition-colors">
                    <td className="py-2.5 px-3 text-xs text-gray-700 border-r border-gray-100">
                      <input
                        type="text"
                        defaultValue={defense.date}
                        className="w-full bg-transparent border-none focus:outline-none focus:bg-white focus:px-2 focus:py-1 focus:border focus:border-[#1F3B73] rounded"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-xs text-gray-700 border-r border-gray-100">
                      <input
                        type="text"
                        defaultValue={defense.time}
                        className="w-full bg-transparent border-none focus:outline-none focus:bg-white focus:px-2 focus:py-1 focus:border focus:border-[#1F3B73] rounded"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-xs text-gray-700 border-r border-gray-100">
                      <input
                        type="text"
                        defaultValue={defense.room}
                        className="w-24 bg-transparent border-none focus:outline-none focus:bg-white focus:px-2 focus:py-1 focus:border focus:border-[#1F3B73] rounded"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-xs border-r border-gray-100">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md">{defense.group}</span>
                    </td>
                    <td className="py-2.5 px-3 text-xs text-gray-700 border-r border-gray-100">{defense.students}</td>
                    <td className="py-2.5 px-3 text-xs text-gray-700 border-r border-gray-100">
                      <select className="w-full bg-transparent border-none focus:outline-none focus:bg-white focus:px-2 focus:py-1 focus:border focus:border-[#1F3B73] rounded text-xs">
                        <option>{defense.supervisor}</option>
                        <option>Dr. Muhammad Rashid</option>
                        <option>Dr. Zainab Ali</option>
                      </select>
                    </td>
                    <td className="py-2.5 px-3 text-xs text-gray-700 border-r border-gray-100">
                      <select className="w-full bg-transparent border-none focus:outline-none focus:bg-white focus:px-2 focus:py-1 focus:border focus:border-[#1F3B73] rounded text-xs">
                        <option>{defense.evaluator}</option>
                        <option>Dr. Imran Hassan</option>
                        <option>Dr. Ayesha Khan</option>
                      </select>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex gap-1">
                        <button className="px-2 py-1 bg-[#34D399] text-white rounded text-xs hover:bg-[#10b981] transition-all">
                          Save
                        </button>
                        <button className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300 transition-all">
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {/* Empty Row for New Entry */}
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <td className="py-2.5 px-3 border-r border-gray-100">
                    <input
                      type="text"
                      placeholder="Click to add date"
                      className="w-full bg-transparent border-none focus:outline-none focus:bg-white focus:px-2 focus:py-1 focus:border focus:border-[#1F3B73] rounded text-xs"
                    />
                  </td>
                  <td className="py-2.5 px-3 border-r border-gray-100">
                    <input
                      type="text"
                      placeholder="Time"
                      className="w-full bg-transparent border-none focus:outline-none focus:bg-white focus:px-2 focus:py-1 focus:border focus:border-[#1F3B73] rounded text-xs"
                    />
                  </td>
                  <td className="py-2.5 px-3 border-r border-gray-100">
                    <input
                      type="text"
                      placeholder="Room"
                      className="w-24 bg-transparent border-none focus:outline-none focus:bg-white focus:px-2 focus:py-1 focus:border focus:border-[#1F3B73] rounded text-xs"
                    />
                  </td>
                  <td className="py-2.5 px-3 border-r border-gray-100">
                    <input
                      type="text"
                      placeholder="Group"
                      className="w-full bg-transparent border-none focus:outline-none focus:bg-white focus:px-2 focus:py-1 focus:border focus:border-[#1F3B73] rounded text-xs"
                    />
                  </td>
                  <td className="py-2.5 px-3 border-r border-gray-100">
                    <input
                      type="text"
                      placeholder="Students"
                      className="w-full bg-transparent border-none focus:outline-none focus:bg-white focus:px-2 focus:py-1 focus:border focus:border-[#1F3B73] rounded text-xs"
                    />
                  </td>
                  <td className="py-2.5 px-3 border-r border-gray-100">
                    <select className="w-full bg-transparent border-none focus:outline-none focus:bg-white focus:px-2 focus:py-1 focus:border focus:border-[#1F3B73] rounded text-xs text-gray-400">
                      <option value="">Select Supervisor</option>
                      <option>Dr. Ahmed Malik</option>
                      <option>Dr. Ayesha Siddiqui</option>
                    </select>
                  </td>
                  <td className="py-2.5 px-3 border-r border-gray-100">
                    <select className="w-full bg-transparent border-none focus:outline-none focus:bg-white focus:px-2 focus:py-1 focus:border focus:border-[#1F3B73] rounded text-xs text-gray-400">
                      <option value="">Select Evaluator</option>
                      <option>Dr. Imran Hassan</option>
                      <option>Dr. Zainab Imran</option>
                    </select>
                  </td>
                  <td className="py-2.5 px-3">
                    <button className="px-3 py-1 bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] text-white rounded text-xs hover:shadow-md transition-all">
                      + Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer Stats */}
          <div className="p-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="text-xs text-gray-600">
              Total Defenses Scheduled: <span className="text-gray-900 font-medium">{defenseSchedule.length}</span>
            </div>
            <div className="flex gap-4 text-xs text-gray-600">
              <span>Room 404: <span className="text-blue-600">3 slots</span></span>
              <span>Room 405: <span className="text-blue-600">2 slots</span></span>
            </div>
          </div>
        </div>
      )}

      {activeView === 'payments' && (
        /* Payment Submissions - Spreadsheet Style */
        <div className="bg-white rounded-lg shadow-md border border-gray-200 flex-1 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign size={20} className="text-[#34D399]" />
              <h2 className="text-gray-900">Payment Forms - Services Rendered</h2>
              <span className="px-2 py-1 bg-[#34D399] text-white rounded-full text-xs">{paymentSubmissions.length} Pending</span>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-gradient-to-r from-[#34D399] to-[#10b981] text-white rounded-lg text-xs hover:shadow-md transition-all flex items-center gap-1">
                <Download size={14} />
                Export to Excel
              </button>
              <button className="px-3 py-1.5 bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] text-white rounded-lg text-xs hover:shadow-md transition-all">
                Process Payments
              </button>
            </div>
          </div>

          <div className="overflow-auto flex-1">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-gradient-to-r from-[#34D399] to-[#10b981] text-white">
                <tr>
                  <th className="text-left py-3 px-3 text-xs border-r border-white/20">#</th>
                  <th className="text-left py-3 px-3 text-xs border-r border-white/20">Full Name</th>
                  <th className="text-left py-3 px-3 text-xs border-r border-white/20">Role</th>
                  <th className="text-left py-3 px-3 text-xs border-r border-white/20">CNIC</th>
                  <th className="text-left py-3 px-3 text-xs border-r border-white/20">NTN</th>
                  <th className="text-left py-3 px-3 text-xs border-r border-white/20">Bank</th>
                  <th className="text-left py-3 px-3 text-xs border-r border-white/20">Account Number</th>
                  <th className="text-left py-3 px-3 text-xs border-r border-white/20">Amount</th>
                  <th className="text-left py-3 px-3 text-xs">Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentSubmissions.map((payment, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-green-50/30 transition-colors">
                    <td className="py-2.5 px-3 text-xs text-gray-700 border-r border-gray-100">{index + 1}</td>
                    <td className="py-2.5 px-3 text-xs text-gray-900 border-r border-gray-100">{payment.fullName}</td>
                    <td className="py-2.5 px-3 border-r border-gray-100">
                      <span className={`px-2 py-1 rounded-md text-xs ${
                        payment.role === 'Supervisor' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {payment.title}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-xs text-gray-700 border-r border-gray-100 font-mono">{payment.cnic}</td>
                    <td className="py-2.5 px-3 text-xs text-gray-700 border-r border-gray-100">{payment.ntn || 'N/A'}</td>
                    <td className="py-2.5 px-3 text-xs text-gray-700 border-r border-gray-100">{payment.bankName}</td>
                    <td className="py-2.5 px-3 text-xs text-gray-700 border-r border-gray-100 font-mono">{payment.accountNumber}</td>
                    <td className="py-2.5 px-3 border-r border-gray-100">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">
                        {payment.amount}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <select className="bg-yellow-50 border border-yellow-200 rounded text-xs px-2 py-1 text-yellow-700 focus:outline-none focus:ring-2 focus:ring-[#1F3B73]">
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Processed</option>
                        <option>Paid</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {paymentSubmissions.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-gray-500 text-sm">
                      No payment forms submitted yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Stats */}
          <div className="p-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="text-xs text-gray-600">
              Total Amount Due: <span className="text-[#34D399] font-medium">Rs. 125,000</span>
            </div>
            <div className="flex gap-4 text-xs text-gray-600">
              <span>Supervisors: <span className="text-blue-600">2 × Rs. 50,000</span></span>
              <span>Evaluators: <span className="text-purple-600">1 × Rs. 25,000</span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}