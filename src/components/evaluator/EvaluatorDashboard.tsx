import { FileText, AlertTriangle, Save, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PaymentForm, PaymentFormData } from '../common/PaymentForm';

export function EvaluatorDashboard() {
  const [presentationScore, setPresentationScore] = useState(7);
  const [technicalScore, setTechnicalScore] = useState(8);
  const [qaScore, setQaScore] = useState(6);
  const [remarks, setRemarks] = useState('');
  const [showDiscrepancy, setShowDiscrepancy] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const totalScore = presentationScore + technicalScore + qaScore;
  const maxScore = 30;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const handlePaymentSubmit = (data: PaymentFormData) => {
    console.log('Payment form submitted:', data);
    // This would send to coordinator's spreadsheet
  };

  useEffect(() => {
    // Simulate discrepancy check
    if (totalScore > 0) {
      const internalScore = 25; // Mock internal evaluator score
      const difference = Math.abs(totalScore - internalScore);
      setShowDiscrepancy(difference > 4);
    }
  }, [totalScore]);

  return (
    <div className="p-5 h-full overflow-hidden flex flex-col">
      {/* Discrepancy Alert */}
      {showDiscrepancy && (
        <div className="mb-4 bg-gradient-to-r from-yellow-50 to-yellow-50/50 border-l-4 border-[#F59E0B] p-4 rounded-r shadow-md animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-[#F59E0B] flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-sm text-yellow-900 mb-1">
                <span>Score Discrepancy Alert</span>
              </p>
              <p className="text-xs text-yellow-800">
                Your score varies significantly from the Internal Evaluator (Difference {'>'} 15%).
                Reconciliation meeting required before final submission.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Project Info Header */}
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-lg p-4 shadow-md border border-gray-200 mb-4">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">Group ID</div>
            <div className="text-sm text-gray-900">Group 42</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Project Title</div>
            <div className="text-sm text-gray-900">AI-Powered Healthcare Diagnosis System</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Students</div>
            <div className="text-sm text-gray-900">Ayesha Malik, Bilal Ahmed</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Defense Date</div>
            <div className="text-sm text-gray-900">December 5, 2025 - 10:00 AM</div>
          </div>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Left Column - PDF Viewer */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <h2 className="text-gray-900">Final Project Report</h2>
          </div>
          <div className="p-4 flex-1">
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg h-full flex items-center justify-center border border-gray-200 shadow-inner">
              <div className="text-center">
                <FileText size={64} className="mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-700 mb-2">Project Documentation</p>
                <p className="text-xs text-gray-500">Healthcare_AI_FinalReport.pdf</p>
                <p className="text-xs text-gray-500 mt-1">156 pages</p>
                <button className="mt-4 px-4 py-2 bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] text-white rounded-lg text-sm hover:shadow-md transition-all">
                  Open Full Document
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Evaluation Form */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-white to-gray-50">
            <h2 className="text-gray-900">Evaluation Form</h2>
            <div className="text-right">
              <div className="text-xs text-gray-500">Total Score</div>
              <div className="text-2xl text-[#1F3B73]">
                {totalScore}/{maxScore}
              </div>
              <div className="text-xs text-gray-600">{percentage}%</div>
            </div>
          </div>

          <div className="p-4 overflow-auto flex-1 space-y-5">
            {/* Presentation Skills */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-900">Presentation Skills</label>
                <span className="text-sm text-[#1F3B73] px-2 py-1 bg-blue-50 rounded-md">{presentationScore}/10</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={presentationScore}
                onChange={(e) => setPresentationScore(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1F3B73]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Poor</span>
                <span>Average</span>
                <span>Excellent</span>
              </div>
            </div>

            {/* Technical Implementation */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-900">Technical Implementation</label>
                <span className="text-sm text-[#1F3B73] px-2 py-1 bg-blue-50 rounded-md">{technicalScore}/10</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={technicalScore}
                onChange={(e) => setTechnicalScore(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1F3B73]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Poor</span>
                <span>Average</span>
                <span>Excellent</span>
              </div>
            </div>

            {/* Q&A Handling */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-900">Q&A Handling</label>
                <span className="text-sm text-[#1F3B73] px-2 py-1 bg-blue-50 rounded-md">{qaScore}/10</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={qaScore}
                onChange={(e) => setQaScore(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1F3B73]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Poor</span>
                <span>Average</span>
                <span>Excellent</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <label className="block text-sm text-gray-900 mb-2">
                Confidential Remarks
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F3B73] focus:border-transparent"
                placeholder="Enter detailed feedback for internal use only..."
              />
              <p className="text-xs text-gray-500 mt-1">
                These remarks will not be shared with students
              </p>
            </div>

            {/* Score Breakdown */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
              <div className="text-sm text-gray-700 mb-3">Score Breakdown</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Presentation</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(presentationScore / 10) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-900">{presentationScore}/10</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Technical</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(technicalScore / 10) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-900">{technicalScore}/10</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Q&A</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(qaScore / 10) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-900">{qaScore}/10</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all flex items-center justify-center gap-2">
                <Save size={16} />
                Save Draft
              </button>
              <button
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] text-white rounded-lg hover:shadow-md transition-all disabled:opacity-50"
                disabled={totalScore === 0}
              >
                Submit Evaluation
              </button>
            </div>

            <p className="text-xs text-center text-gray-500">
              Your submission will be final and cannot be edited after confirmation
            </p>
          </div>
        </div>
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <PaymentForm
          role="Evaluator"
          onClose={() => setShowPaymentForm(false)}
          onSubmit={handlePaymentSubmit}
        />
      )}
    </div>
  );
}