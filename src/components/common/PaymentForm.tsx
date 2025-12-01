import { X, DollarSign, Check } from 'lucide-react';
import { useState } from 'react';

interface PaymentFormProps {
  role: 'Supervisor' | 'Evaluator';
  onClose: () => void;
  onSubmit: (data: PaymentFormData) => void;
}

export interface PaymentFormData {
  fullName: string;
  cnic: string;
  ntn: string;
  accountNumber: string;
  bankName: string;
  title: string;
  role: string;
  amount: string;
}

export function PaymentForm({ role, onClose, onSubmit }: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    fullName: '',
    cnic: '',
    ntn: '',
    accountNumber: '',
    bankName: '',
    title: role === 'Supervisor' ? 'Project Supervisor' : 'External Evaluator',
    role: role,
    amount: role === 'Supervisor' ? 'Rs. 50,000' : 'Rs. 25,000',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof PaymentFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const isFormValid = () => {
    return (
      formData.fullName &&
      formData.cnic.length === 15 &&
      formData.ntn &&
      formData.accountNumber &&
      formData.bankName
    );
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
        <div className="bg-white rounded-xl shadow-2xl w-[500px] p-8 text-center">
          <div className="w-16 h-16 bg-[#34D399] rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-white" />
          </div>
          <h3 className="text-xl text-gray-900 mb-2">Form Submitted Successfully!</h3>
          <p className="text-sm text-gray-600">
            Your payment information has been sent to the coordinator for processing.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-[600px] max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-white to-gray-50">
          <div className="flex items-center gap-2">
            <DollarSign size={20} className="text-[#1F3B73]" />
            <h3 className="text-gray-900">Payment Information Form</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg p-1.5 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-5 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800">
              Please fill in your banking details for payment processing. This information will be
              securely sent to the coordinator.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F3B73] focus:border-transparent"
                placeholder="Enter your full name as per CNIC"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                CNIC <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.cnic}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  const formatted = value
                    .slice(0, 13)
                    .replace(/(\d{5})(\d{7})(\d{1})/, '$1-$2-$3');
                  handleChange('cnic', formatted);
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F3B73] focus:border-transparent"
                placeholder="12345-1234567-1"
                maxLength={15}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                NTN (Optional)
              </label>
              <input
                type="text"
                value={formData.ntn}
                onChange={(e) => handleChange('ntn', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F3B73] focus:border-transparent"
                placeholder="Enter NTN number"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Bank Name <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.bankName}
                onChange={(e) => handleChange('bankName', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F3B73] focus:border-transparent"
              >
                <option value="">Select Bank</option>
                <option value="HBL">Habib Bank Limited (HBL)</option>
                <option value="UBL">United Bank Limited (UBL)</option>
                <option value="MCB">Muslim Commercial Bank (MCB)</option>
                <option value="ABL">Allied Bank Limited (ABL)</option>
                <option value="Meezan">Meezan Bank</option>
                <option value="AlFalah">Bank Alfalah</option>
                <option value="Standard">Standard Chartered</option>
                <option value="Faysal">Faysal Bank</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Account Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => handleChange('accountNumber', e.target.value.replace(/\D/g, ''))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F3B73] focus:border-transparent"
                placeholder="Enter account number"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Title/Designation</label>
              <input
                type="text"
                value={formData.title}
                disabled
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Payment Amount</label>
              <input
                type="text"
                value={formData.amount}
                disabled
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-600"
              />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-800">
              ⚠ Please ensure all information is accurate. Payment processing may be delayed if
              incorrect details are provided.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-200 flex gap-3 bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-white transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#1F3B73] to-[#2a4d8f] text-white rounded-lg hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit to Coordinator
          </button>
        </div>
      </div>
    </div>
  );
}
