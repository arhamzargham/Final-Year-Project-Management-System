import { FileText, AlertCircle, UserX, ChevronRight, X, CheckSquare, Eye } from 'lucide-react';
import { useState } from 'react';

export function HODDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [newSupervisor, setNewSupervisor] = useState('');
  const [reassignReason, setReassignReason] = useState('');
  const [activeTab, setActiveTab] = useState<'cases' | 'results'>('cases');
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState<any>(null);

  const cases = [
    {
      id: 1,
      type: 'Grade Appeal',
      title: 'Appeal against Grade - Student Ali Hassan',
      student: 'Ali Hassan',
      group: 'Group 18',
      status: 'Pending HOD Decision',
      priority: 'high',
      date: '28 Nov 2025',
      description: 'Student has appealed against B grade in Phase 2 evaluation',
    },
    {
      id: 2,
      type: 'Supervisor Issue',
      title: 'Supervisor Inactivity - Dr. Ahmed Khan',
      student: 'Multiple Groups (5)',
      group: 'Groups 21-25',
      status: 'Escalated by System',
      priority: 'critical',
      date: '26 Nov 2025',
      description: 'No response to student submissions for 14+ days',
    },
    {
      id: 3,
      type: 'Plagiarism',
      title: 'Plagiarism Report - Group 33',
      student: 'Sara Malik, Usman Ali',
      group: 'Group 33',
      status: 'Under Review',
      priority: 'critical',
      date: '25 Nov 2025',
      description: 'System detected 67% similarity with external source',
    },
    {
      id: 4,
      type: 'Extension Request',
      title: 'Timeline Extension Request - Group 7',
      student: 'Fatima Ahmed',
      group: 'Group 7',
      status: 'Pending Approval',
      priority: 'medium',
      date: '24 Nov 2025',
      description: 'Medical emergency, requesting 2-week extension',
    },
  ];

  const resultsForPublication = [
    {
      id: 1,
      group: 'Group 18',
      students: 'Ali Hassan, Fatima Khan',
      project: 'AI Healthcare Diagnostic System',
      supervisor: 'Dr. Ahmed Malik',
      internalGrade: 'A-',
      externalGrade: 'A',
      finalGrade: 'A',
      status: 'Pending Approval',
      defenseDate: '25 Nov 2025',
    },
    {
      id: 2,
      group: 'Group 24',
      students: 'Bilal Ahmed, Sara Ali',
      project: 'Blockchain Supply Chain',
      supervisor: 'Dr. Ayesha Siddiqui',
      internalGrade: 'B+',
      externalGrade: 'A-',
      finalGrade: 'B+',
      status: 'Pending Approval',
      defenseDate: '26 Nov 2025',
    },
    {
      id: 3,
      group: 'Group 33',
      students: 'Hassan Raza, Zainab Imran',
      project: 'Smart Grid Optimization',
      supervisor: 'Dr. Muhammad Rashid',
      internalGrade: 'A',
      externalGrade: 'A',
      finalGrade: 'A',
      status: 'Pending Approval',
      defenseDate: '27 Nov 2025',
    },
    {
      id: 4,
      group: 'Group 42',
      students: 'Usman Ali, Maryam Khan',
      project: 'E-Commerce Platform',
      supervisor: 'Dr. Imran Malik',
      internalGrade: 'B',
      externalGrade: 'B+',
      finalGrade: 'B+',
      status: 'Approved',
      defenseDate: '24 Nov 2025',
    },
  ];

  const supervisors = [
    'Dr. Muhammad Rashid',
    'Dr. Ayesha Siddiqui',
    'Dr. Imran Malik',
    'Dr. Zainab Ali',
    'Dr. Hassan Ahmed',
  ];

  const handleReassign = (caseData: any) => {
    setSelectedCase(caseData);
    setShowModal(true);
  };

  const handleViewResult = (result: any) => {
    setSelectedResult(result);
    setShowResultsModal(true);
  };

  const handleApproveResult = (resultId: number) => {
    console.log('Approved result:', resultId);
    setShowResultsModal(false);
  };

  return (
    <div className="p-5 h-full overflow-hidden flex flex-col">
      {/* Executive Summary */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 shadow-md border border-gray-200">
          <div className="text-3xl text-gray-900 mb-1">12</div>
          <div className="text-xs text-gray-600">Total Cases</div>
          <div className="text-xs text-gray-500 mt-0.5">This Month</div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-white rounded-lg p-4 shadow-md border-l-4 border-[#EF4444]">
          <div className="text-3xl text-[#EF4444] mb-1">4</div>
          <div className="text-xs text-gray-600">Pending Decision</div>
          <div className="text-xs text-gray-500 mt-0.5">Awaiting HOD Action</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-white rounded-lg p-4 shadow-md border border-yellow-200">
          <div className="text-3xl text-[#F59E0B] mb-1">2</div>
          <div className="text-xs text-gray-600">Critical Escalations</div>
          <div className="text-xs text-gray-500 mt-0.5">Requires Immediate Action</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-4 shadow-md border border-green-200">
          <div className="text-3xl text-[#34D399] mb-1">6</div>
          <div className="text-xs text-gray-600">Resolved This Week</div>
          <div className="text-xs text-gray-500 mt-0.5">Average: 3.2 days</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            activeTab === 'cases'
              ? 'bg-[#1F3B73] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          Case Management
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
            activeTab === 'results'
              ? 'bg-[#1F3B73] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <CheckSquare size={16} />
          Results Publication
          <span className="px-1.5 py-0.5 bg-[#F59E0B] text-white rounded-full text-xs">3</span>
        </button>
      </div>

      {activeTab === 'cases' ? (
        <>
          {/* Case Resolution Table */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 flex-1 overflow-hidden flex flex-col mb-4">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
              <h2 className="text-gray-900">Case Management & Escalations</h2>
            </div>

            <div className="overflow-auto flex-1">
              <table className="w-full">
                <thead className="sticky top-0 bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2.5 px-3 text-xs text-gray-700">Case ID</th>
                    <th className="text-left py-2.5 px-3 text-xs text-gray-700">Type</th>
                    <th className="text-left py-2.5 px-3 text-xs text-gray-700">Description</th>
                    <th className="text-left py-2.5 px-3 text-xs text-gray-700">Student/Group</th>
                    <th className="text-left py-2.5 px-3 text-xs text-gray-700">Status</th>
                    <th className="text-left py-2.5 px-3 text-xs text-gray-700">Priority</th>
                    <th className="text-left py-2.5 px-3 text-xs text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map((caseItem) => (
                    <tr key={caseItem.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                      <td className="py-2.5 px-3 text-sm text-gray-800">#{caseItem.id}</td>
                      <td className="py-2.5 px-3">
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-700">
                          {caseItem.type}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="text-sm text-gray-900 mb-1">{caseItem.title}</div>
                        <div className="text-xs text-gray-500">{caseItem.description}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="text-sm text-gray-800">{caseItem.student}</div>
                        <div className="text-xs text-gray-500">{caseItem.group}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-md shadow-sm ${
                            caseItem.status === 'Pending HOD Decision'
                              ? 'bg-gradient-to-r from-[#F59E0B] to-[#d97706] text-white'
                              : caseItem.status === 'Escalated by System'
                              ? 'bg-gradient-to-r from-[#EF4444] to-[#dc2626] text-white'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {caseItem.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-md ${
                            caseItem.priority === 'critical'
                              ? 'bg-red-100 text-[#EF4444]'
                              : caseItem.priority === 'high'
                              ? 'bg-orange-100 text-[#F59E0B]'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {caseItem.priority}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex gap-2">
                          {caseItem.type === 'Grade Appeal' && (
                            <button className="px-3 py-1.5 bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] text-white rounded-lg text-xs hover:shadow-md transition-all flex items-center gap-1">
                              View Evidence
                              <ChevronRight size={12} />
                            </button>
                          )}
                          {caseItem.type === 'Supervisor Issue' && (
                            <button
                              onClick={() => handleReassign(caseItem)}
                              className="px-3 py-1.5 bg-gradient-to-r from-[#EF4444] to-[#dc2626] text-white rounded-lg text-xs hover:shadow-md transition-all flex items-center gap-1"
                            >
                              <UserX size={12} />
                              Reassign
                            </button>
                          )}
                          {caseItem.type === 'Plagiarism' && (
                            <button className="px-3 py-1.5 bg-gradient-to-r from-[#EF4444] to-[#dc2626] text-white rounded-lg text-xs hover:shadow-md transition-all">
                              Review Report
                            </button>
                          )}
                          {caseItem.type === 'Extension Request' && (
                            <div className="flex gap-1">
                              <button className="px-2 py-1.5 bg-[#34D399] text-white rounded-lg text-xs hover:bg-[#10b981] hover:shadow-sm transition-all">
                                Approve
                              </button>
                              <button className="px-2 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs hover:bg-gray-300 transition-all">
                                Deny
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
            <h3 className="text-gray-900 mb-3">Recent Decisions</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-[#34D399] rounded-full"></div>
                <span className="text-gray-600">Approved timeline extension for Group 15</span>
                <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-[#EF4444] rounded-full"></div>
                <span className="text-gray-600">Rejected appeal from Group 29 - Grade maintained</span>
                <span className="text-xs text-gray-400 ml-auto">5 hours ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-[#F59E0B] rounded-full"></div>
                <span className="text-gray-600">Reassigned 3 groups from Dr. Khan to Dr. Malik</span>
                <span className="text-xs text-gray-400 ml-auto">Yesterday</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Results Publication Table */
        <div className="bg-white rounded-lg shadow-md border border-gray-200 flex-1 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <h2 className="text-gray-900">Results Pending Publication Approval</h2>
          </div>

          <div className="overflow-auto flex-1">
            <table className="w-full">
              <thead className="sticky top-0 bg-gradient-to-r from-gray-50 to-gray-100">
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2.5 px-3 text-xs text-gray-700">Group</th>
                  <th className="text-left py-2.5 px-3 text-xs text-gray-700">Students</th>
                  <th className="text-left py-2.5 px-3 text-xs text-gray-700">Project Title</th>
                  <th className="text-left py-2.5 px-3 text-xs text-gray-700">Supervisor</th>
                  <th className="text-left py-2.5 px-3 text-xs text-gray-700">Internal</th>
                  <th className="text-left py-2.5 px-3 text-xs text-gray-700">External</th>
                  <th className="text-left py-2.5 px-3 text-xs text-gray-700">Final Grade</th>
                  <th className="text-left py-2.5 px-3 text-xs text-gray-700">Status</th>
                  <th className="text-left py-2.5 px-3 text-xs text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {resultsForPublication.map((result) => (
                  <tr key={result.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                    <td className="py-2.5 px-3 text-sm text-gray-800">{result.group}</td>
                    <td className="py-2.5 px-3 text-xs text-gray-700">{result.students}</td>
                    <td className="py-2.5 px-3 text-sm text-gray-800">{result.project}</td>
                    <td className="py-2.5 px-3 text-xs text-gray-600">{result.supervisor}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs">
                        {result.internalGrade}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs">
                        {result.externalGrade}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2.5 py-1 bg-gradient-to-r from-[#34D399] to-[#10b981] text-white rounded-md text-sm shadow-sm">
                        {result.finalGrade}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      {result.status === 'Pending Approval' ? (
                        <span className="px-2 py-1 bg-gradient-to-r from-[#F59E0B] to-[#d97706] text-white rounded-md text-xs">
                          Pending
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gradient-to-r from-[#34D399] to-[#10b981] text-white rounded-md text-xs">
                          Approved
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleViewResult(result)}
                          className="px-2 py-1.5 bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] text-white rounded-lg text-xs hover:shadow-md transition-all flex items-center gap-1"
                        >
                          <Eye size={12} />
                          Review
                        </button>
                        {result.status === 'Pending Approval' && (
                          <button
                            onClick={() => handleApproveResult(result.id)}
                            className="px-2 py-1.5 bg-[#34D399] text-white rounded-lg text-xs hover:bg-[#10b981] transition-all"
                          >
                            Approve
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

      {/* Reassign Supervisor Modal */}
      {showModal && selectedCase && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-[500px] max-h-[90vh] overflow-auto">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-white to-gray-50">
              <h3 className="text-gray-900">Reassign Supervisor</h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setNewSupervisor('');
                  setReassignReason('');
                }}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg p-1.5 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              <div className="bg-gradient-to-r from-red-50 to-red-50/50 border-l-4 border-[#EF4444] rounded-r p-3 flex items-start gap-2">
                <AlertCircle className="text-[#EF4444] flex-shrink-0 mt-0.5" size={18} />
                <div className="text-sm text-red-800">
                  <p className="mb-1">Supervisor Inactivity Detected</p>
                  <p className="text-xs text-red-700">
                    Dr. Ahmed Khan has not responded to 5 groups for over 14 days
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Current Supervisor</label>
                <input
                  type="text"
                  value="Dr. Ahmed Khan"
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Affected Groups</label>
                <input
                  type="text"
                  value="Groups 21, 22, 23, 24, 25 (5 groups)"
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">New Supervisor *</label>
                <select
                  value={newSupervisor}
                  onChange={(e) => setNewSupervisor(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F3B73] focus:border-transparent"
                >
                  <option value="">Select a supervisor...</option>
                  {supervisors.map((supervisor) => (
                    <option key={supervisor} value={supervisor}>
                      {supervisor}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Reason for Reassignment *</label>
                <textarea
                  value={reassignReason}
                  onChange={(e) => setReassignReason(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F3B73] focus:border-transparent"
                  placeholder="Enter official reason for this administrative action..."
                />
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-yellow-50/50 border-l-4 border-[#F59E0B] rounded-r p-3">
                <p className="text-xs text-yellow-800">
                  ⚠ This action will notify both supervisors and all affected students. An official
                  email will be sent to the department.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-gray-200 flex gap-3 bg-gray-50">
              <button
                onClick={() => {
                  setShowModal(false);
                  setNewSupervisor('');
                  setReassignReason('');
                }}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-white transition-all"
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#EF4444] to-[#dc2626] text-white rounded-lg hover:shadow-md transition-all disabled:opacity-50"
                disabled={!newSupervisor || !reassignReason}
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Review Modal */}
      {showResultsModal && selectedResult && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-[600px] max-h-[90vh] overflow-auto">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-white to-gray-50">
              <h3 className="text-gray-900">Result Review: {selectedResult.group}</h3>
              <button
                onClick={() => setShowResultsModal(false)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg p-1.5 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Students</label>
                  <div className="text-sm text-gray-900">{selectedResult.students}</div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Defense Date</label>
                  <div className="text-sm text-gray-900">{selectedResult.defenseDate}</div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Project Title</label>
                <div className="text-sm text-gray-900">{selectedResult.project}</div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Supervisor</label>
                <div className="text-sm text-gray-900">{selectedResult.supervisor}</div>
              </div>

              <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Internal Grade</div>
                  <div className="text-2xl text-blue-600">{selectedResult.internalGrade}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">External Grade</div>
                  <div className="text-2xl text-purple-600">{selectedResult.externalGrade}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Final Grade</div>
                  <div className="text-2xl text-[#34D399]">{selectedResult.finalGrade}</div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  ✓ All evaluation forms submitted and verified
                </p>
                <p className="text-xs text-blue-800 mt-1">
                  ✓ No discrepancies found between evaluators
                </p>
              </div>
            </div>

            <div className="p-5 border-t border-gray-200 flex gap-3 bg-gray-50">
              <button
                onClick={() => setShowResultsModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-white transition-all"
              >
                Close
              </button>
              <button
                onClick={() => handleApproveResult(selectedResult.id)}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#34D399] to-[#10b981] text-white rounded-lg hover:shadow-md transition-all"
              >
                Approve for Publication
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}