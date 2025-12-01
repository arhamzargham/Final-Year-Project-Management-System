import { Bell, CheckCircle, AlertTriangle, FileText, X, TrendingUp, Calendar, MessageSquare, BarChart3, Clock, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { PaymentForm, PaymentFormData } from '../common/PaymentForm';

export function SupervisorDashboard() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [reviewDecision, setReviewDecision] = useState<string>('');
  const [remarks, setRemarks] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'groups'>('overview');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handlePaymentSubmit = (data: PaymentFormData) => {
    console.log('Payment form submitted:', data);
    // This would send to coordinator's spreadsheet
  };

  const supervisees = [
    {
      id: 'A',
      title: 'AI Chatbot for Customer Support',
      phase: 'Phase 3',
      logStatus: 'All Logs Signed',
      status: 'on-track',
      progress: 85,
      students: 'Ahmed Ali, Sara Khan',
      lastActivity: '2 hours ago',
    },
    {
      id: 'B',
      title: 'Cryptocurrency Wallet Management',
      phase: 'Phase 2',
      logStatus: 'Logs Missing',
      status: 'warning',
      progress: 45,
      students: 'Bilal Hassan, Fatima Malik',
      lastActivity: '5 days ago',
    },
    {
      id: 'C',
      title: 'Smart Grid Energy Optimization',
      phase: 'Phase 1',
      logStatus: 'Review Pending',
      status: 'pending',
      progress: 25,
      students: 'Usman Ahmed, Ayesha Siddiqui',
      lastActivity: '1 day ago',
    },
    {
      id: 'D',
      title: 'E-Commerce Platform with AR',
      phase: 'Phase 3',
      logStatus: 'All Logs Signed',
      status: 'on-track',
      progress: 90,
      students: 'Hassan Raza, Zainab Ali',
      lastActivity: '1 hour ago',
    },
    {
      id: 'E',
      title: 'Hospital Management System',
      phase: 'Phase 2',
      logStatus: 'Partial Submission',
      status: 'warning',
      progress: 60,
      students: 'Ali Imran, Maryam Khan',
      lastActivity: '3 days ago',
    },
  ];

  const upcomingMeetings = [
    { group: 'Group A', time: 'Today, 2:00 PM', topic: 'Sprint Review' },
    { group: 'Group D', time: 'Tomorrow, 10:00 AM', topic: 'Code Review' },
    { group: 'Group C', time: 'Dec 2, 3:00 PM', topic: 'Proposal Discussion' },
  ];

  const recentActivity = [
    { group: 'Group A', action: 'Submitted Monthly Log #4', time: '2 hours ago', type: 'success' },
    { group: 'Group B', action: 'Missed submission deadline', time: '5 days ago', type: 'error' },
    { group: 'Group D', action: 'Code pushed to repository', time: '1 hour ago', type: 'success' },
    { group: 'Group C', action: 'Requested meeting', time: '1 day ago', type: 'info' },
  ];

  return (
    <div className="p-5 h-full overflow-hidden flex flex-col">
      {/* Enhanced Stats Overview */}
      <div className="grid grid-cols-6 gap-3 mb-4">
        <div className="col-span-1 bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 shadow-md border border-gray-200">
          <div className="text-2xl text-gray-900 mb-1">10</div>
          <div className="text-xs text-gray-600">Total Groups</div>
        </div>
        <div className="col-span-1 bg-gradient-to-br from-green-50 to-white rounded-lg p-3 shadow-md border border-green-200">
          <div className="text-2xl text-[#34D399] mb-1">6</div>
          <div className="text-xs text-gray-600">On Track</div>
        </div>
        <div className="col-span-1 bg-gradient-to-br from-yellow-50 to-white rounded-lg p-3 shadow-md border border-yellow-200">
          <div className="text-2xl text-[#F59E0B] mb-1">3</div>
          <div className="text-xs text-gray-600">Needs Review</div>
        </div>
        <div className="col-span-1 bg-gradient-to-br from-red-50 to-white rounded-lg p-3 shadow-md border border-red-200">
          <div className="text-2xl text-[#EF4444] mb-1">1</div>
          <div className="text-xs text-gray-600">At Risk</div>
        </div>
        <div className="col-span-2 bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] rounded-lg p-3 shadow-md text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs opacity-90 mb-1">Average Progress</div>
              <div className="text-2xl">61%</div>
            </div>
            <TrendingUp size={32} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            activeTab === 'overview'
              ? 'bg-[#1F3B73] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          Overview Dashboard
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            activeTab === 'groups'
              ? 'bg-[#1F3B73] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          All Groups
        </button>
      </div>

      {/* Content Based on Tab */}
      {activeTab === 'overview' ? (
        <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
          {/* Left - Group Performance Chart */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 size={18} className="text-[#1F3B73]" />
              <h3 className="text-gray-900 text-sm">Group Performance</h3>
            </div>
            <div className="flex-1 space-y-2 overflow-auto">
              {supervisees.map((group) => (
                <div key={group.id} className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-700">Group {group.id}</span>
                    <span className="text-xs text-[#1F3B73]">{group.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        group.progress >= 75
                          ? 'bg-gradient-to-r from-[#34D399] to-[#10b981]'
                          : group.progress >= 50
                          ? 'bg-gradient-to-r from-[#F59E0B] to-[#d97706]'
                          : 'bg-gradient-to-r from-[#EF4444] to-[#dc2626]'
                      }`}
                      style={{ width: `${group.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{group.phase}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Middle - Upcoming Meetings */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={18} className="text-[#1F3B73]" />
              <h3 className="text-gray-900 text-sm">Upcoming Meetings</h3>
            </div>
            <div className="space-y-3 flex-1 overflow-auto">
              {upcomingMeetings.map((meeting, idx) => (
                <div key={idx} className="p-3 bg-gradient-to-r from-blue-50 to-white rounded-lg border-l-4 border-[#1F3B73] hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-sm text-gray-900">{meeting.group}</span>
                    <Clock size={14} className="text-gray-400" />
                  </div>
                  <div className="text-xs text-gray-600 mb-1">{meeting.topic}</div>
                  <div className="text-xs text-[#1F3B73]">{meeting.time}</div>
                </div>
              ))}
              <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-xs text-gray-600 hover:border-[#1F3B73] hover:text-[#1F3B73] transition-all">
                + Schedule New Meeting
              </button>
            </div>
          </div>

          {/* Right - Recent Activity */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={18} className="text-[#1F3B73]" />
              <h3 className="text-gray-900 text-sm">Recent Activity</h3>
            </div>
            <div className="space-y-2 flex-1 overflow-auto">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      activity.type === 'success'
                        ? 'bg-[#34D399]'
                        : activity.type === 'error'
                        ? 'bg-[#EF4444]'
                        : 'bg-[#1F3B73]'
                    }`}
                  ></div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-900">{activity.group}</div>
                    <div className="text-xs text-gray-600">{activity.action}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 flex-1 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <h2 className="text-gray-900">My Supervisees</h2>
          </div>

          <div className="overflow-auto flex-1">
            <table className="w-full">
              <thead className="sticky top-0 bg-gradient-to-r from-gray-50 to-gray-100">
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2.5 px-3 text-xs text-gray-700">Group</th>
                  <th className="text-left py-2.5 px-3 text-xs text-gray-700">Project Title</th>
                  <th className="text-left py-2.5 px-3 text-xs text-gray-700">Students</th>
                  <th className="text-left py-2.5 px-3 text-xs text-gray-700">Progress</th>
                  <th className="text-left py-2.5 px-3 text-xs text-gray-700">Log Status</th>
                  <th className="text-left py-2.5 px-3 text-xs text-gray-700">Last Activity</th>
                  <th className="text-left py-2.5 px-3 text-xs text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {supervisees.map((group) => (
                  <tr key={group.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                    <td className="py-2.5 px-3 text-sm text-gray-800">Group {group.id}</td>
                    <td className="py-2.5 px-3">
                      <div className="text-sm text-gray-800">{group.title}</div>
                      <div className="text-xs text-gray-500">{group.phase}</div>
                    </td>
                    <td className="py-2.5 px-3 text-xs text-gray-600">{group.students}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5 w-16">
                          <div
                            className={`h-1.5 rounded-full ${
                              group.progress >= 75
                                ? 'bg-[#34D399]'
                                : group.progress >= 50
                                ? 'bg-[#F59E0B]'
                                : 'bg-[#EF4444]'
                            }`}
                            style={{ width: `${group.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{group.progress}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      {group.status === 'on-track' && (
                        <span className="flex items-center gap-1 text-xs text-[#34D399]">
                          <CheckCircle size={14} />
                          Complete
                        </span>
                      )}
                      {group.status === 'warning' && (
                        <span className="flex items-center gap-1 text-xs text-[#F59E0B]">
                          <AlertTriangle size={14} />
                          Missing
                        </span>
                      )}
                      {group.status === 'pending' && (
                        <span className="flex items-center gap-1 text-xs text-[#1F3B73]">
                          <FileText size={14} />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-xs text-gray-500">{group.lastActivity}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex gap-1">
                        {group.status === 'warning' && (
                          <button className="px-2 py-1 border border-gray-300 rounded-lg text-xs hover:bg-gray-50 hover:shadow-sm transition-all flex items-center gap-1">
                            <Bell size={12} />
                            Remind
                          </button>
                        )}
                        {group.status === 'pending' && (
                          <button
                            onClick={() => setSelectedGroup(group.id)}
                            className="px-2 py-1 bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] text-white rounded-lg text-xs hover:shadow-md transition-all"
                          >
                            Review
                          </button>
                        )}
                        {group.status === 'on-track' && (
                          <button className="px-2 py-1 border border-gray-300 rounded-lg text-xs hover:bg-gray-50 hover:shadow-sm transition-all">
                            View
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Side Panel Drawer */}
      {selectedGroup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-end z-50 animate-fade-in">
          <div className="bg-white w-[600px] h-full shadow-2xl flex flex-col animate-slide-in">
            {/* Panel Header */}
            <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-white to-gray-50">
              <h3 className="text-gray-900">Quick Review: Group {selectedGroup}</h3>
              <button
                onClick={() => setSelectedGroup(null)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg p-1.5 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* PDF Preview */}
            <div className="flex-1 overflow-auto p-5">
              <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg p-4 mb-4 h-64 flex items-center justify-center border border-gray-200 shadow-inner">
                <div className="text-center">
                  <FileText size={48} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Proposal Document Preview</p>
                  <p className="text-xs text-gray-500 mt-1">Smart_Grid_Proposal.pdf</p>
                </div>
              </div>

              {/* Review Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Decision</label>
                  <div className="space-y-2">
                    {['Approve', 'Request Revision', 'Reject'].map((option) => (
                      <label key={option} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="decision"
                          value={option}
                          checked={reviewDecision === option}
                          onChange={(e) => setReviewDecision(e.target.value)}
                          className="text-[#1F3B73] w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Remarks</label>
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F3B73] focus:border-transparent"
                    placeholder="Enter your feedback here..."
                  />
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-5 border-t border-gray-200 flex gap-3 bg-gray-50">
              <button
                onClick={() => setSelectedGroup(null)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-white transition-all"
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] text-white rounded-lg hover:shadow-md transition-all disabled:opacity-50"
                disabled={!reviewDecision}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <PaymentForm
          role="Supervisor"
          onClose={() => setShowPaymentForm(false)}
          onSubmit={handlePaymentSubmit}
        />
      )}
    </div>
  );
}