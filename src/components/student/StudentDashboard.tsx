import { Upload, AlertCircle, CheckCircle, Clock, Lock } from 'lucide-react';
import { useState } from 'react';

export function StudentDashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const timeline = [
    { stage: 'Proposal', status: 'completed' },
    { stage: 'SRS', status: 'completed' },
    { stage: 'Development', status: 'active' },
    { stage: 'Evaluation', status: 'locked' },
    { stage: 'Defense', status: 'locked' },
  ];

  const evaluationFeedback = [
    {
      stage: 'Proposal',
      grade: 'B+',
      comments: 'Good scope, refine methodology',
      status: 'Cleared',
    },
    {
      stage: 'SRS',
      grade: 'A-',
      comments: 'Well-structured requirements documentation',
      status: 'Cleared',
    },
  ];

  return (
    <div className="p-5 h-full overflow-hidden flex flex-col">
      {/* Hero Timeline Section */}
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-lg p-5 mb-4 shadow-md border border-gray-200">
        <h2 className="text-gray-900 mb-4 flex items-center gap-2">
          Project Progress Timeline
          <span className="text-xs px-2 py-1 bg-[#34D399] text-white rounded-full">Active</span>
        </h2>
        <div className="flex items-center justify-between">
          {timeline.map((item, index) => (
            <div key={item.stage} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all ${
                    item.status === 'completed'
                      ? 'bg-[#34D399] ring-4 ring-green-100'
                      : item.status === 'active'
                      ? 'bg-[#1F3B73] animate-pulse ring-4 ring-blue-100'
                      : 'bg-gray-300'
                  }`}
                >
                  {item.status === 'completed' ? (
                    <CheckCircle size={22} className="text-white" />
                  ) : item.status === 'active' ? (
                    <Clock size={22} className="text-white" />
                  ) : (
                    <Lock size={22} className="text-white" />
                  )}
                </div>
                <span className="mt-2 text-xs text-gray-700">{item.stage}</span>
                {item.status === 'completed' && (
                  <span className="text-xs text-[#34D399] mt-1">✓ Done</span>
                )}
                {item.status === 'active' && (
                  <span className="text-xs text-[#1F3B73] mt-1">● Active</span>
                )}
              </div>
              {index < timeline.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded transition-all ${
                    item.status === 'completed' ? 'bg-[#34D399]' : 'bg-gray-300'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4 flex-1 min-h-0">
        {/* Left Column - Task Cards */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-900 flex items-center gap-2">
                Pending Actions
                <span className="w-2 h-2 bg-[#EF4444] rounded-full animate-pulse"></span>
              </h3>
              <span className="px-2.5 py-1 bg-gradient-to-r from-[#EF4444] to-[#dc2626] text-white rounded-md text-xs shadow-sm">
                Due in 2 days
              </span>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1F3B73] hover:bg-blue-50/30 transition-all cursor-pointer">
              <Upload className="mx-auto mb-2 text-gray-400" size={36} />
              <p className="text-gray-700 mb-1 text-sm">Upload Monthly Log #3</p>
              <p className="text-xs text-gray-500 mb-3">
                Drag and drop your file here, or click to browse
              </p>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block px-4 py-2 bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] text-white rounded-lg cursor-pointer hover:shadow-md transition-all text-sm"
              >
                Select File
              </label>
              {selectedFile && (
                <p className="mt-3 text-xs text-[#34D399] bg-green-50 py-1.5 px-3 rounded-md inline-block">
                  ✓ {selectedFile.name} selected
                </p>
              )}
            </div>

            {!selectedFile && (
              <div className="mt-3 flex items-start gap-2 p-3 bg-gradient-to-r from-red-50 to-red-50/50 border-l-4 border-[#EF4444] rounded-r">
                <AlertCircle size={16} className="text-[#EF4444] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-red-800">
                    Missing submission: Monthly log is required for phase progression
                  </p>
                </div>
              </div>
            )}
            
            {selectedFile && (
              <button className="w-full mt-3 px-4 py-2.5 bg-[#34D399] text-white rounded-lg hover:bg-[#10b981] transition-all shadow-sm">
                Submit Log
              </button>
            )}
          </div>
        </div>

        {/* Right Column - Status */}
        <div>
          <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 h-full">
            <h3 className="text-gray-900 mb-3">Compliance Meter</h3>

            {/* Circular Progress */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative w-28 h-28">
                <svg className="transform -rotate-90 w-28 h-28">
                  <circle
                    cx="56"
                    cy="56"
                    r="50"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="50"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(18 / 24) * 314} 314`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#34D399" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl text-gray-900">18/24</span>
                  <span className="text-xs text-gray-500">Logs</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">75% Complete</p>
            </div>

            {/* Status Rows */}
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 px-2 rounded-md hover:bg-gray-50 transition-colors">
                <span className="text-xs text-gray-700">Supervisor Approval</span>
                <span className="px-2 py-0.5 bg-gradient-to-r from-[#F59E0B] to-[#d97706] text-white rounded-md text-xs shadow-sm">
                  Pending
                </span>
              </div>
              <div className="flex items-center justify-between py-2 px-2 rounded-md hover:bg-gray-50 transition-colors">
                <span className="text-xs text-gray-700">Documentation</span>
                <span className="px-2 py-0.5 bg-gradient-to-r from-[#34D399] to-[#10b981] text-white rounded-md text-xs shadow-sm">
                  Approved
                </span>
              </div>
              <div className="flex items-center justify-between py-2 px-2 rounded-md hover:bg-gray-50 transition-colors">
                <span className="text-xs text-gray-700">Code Repository</span>
                <span className="px-2 py-0.5 bg-gradient-to-r from-[#34D399] to-[#10b981] text-white rounded-md text-xs shadow-sm">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Evaluation Feedback Table */}
      <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
        <h3 className="text-gray-900 mb-3">Evaluation Feedback</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="text-left py-2.5 px-3 text-xs text-gray-700">Stage</th>
                <th className="text-left py-2.5 px-3 text-xs text-gray-700">Grade</th>
                <th className="text-left py-2.5 px-3 text-xs text-gray-700">Comments</th>
                <th className="text-left py-2.5 px-3 text-xs text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {evaluationFeedback.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors">
                  <td className="py-2.5 px-3 text-sm text-gray-800">{item.stage}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2.5 py-1 bg-gradient-to-r from-[#34D399] to-[#10b981] text-white rounded-md text-xs shadow-sm">
                      {item.grade}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-xs text-gray-600">{item.comments}</td>
                  <td className="py-2.5 px-3">
                    <span className="flex items-center gap-1 text-xs text-[#34D399]">
                      <CheckCircle size={14} />
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 px-5 py-3 bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] text-white rounded-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 hover:scale-105">
        <AlertCircle size={18} />
        Submit Appeal
      </button>
    </div>
  );
}