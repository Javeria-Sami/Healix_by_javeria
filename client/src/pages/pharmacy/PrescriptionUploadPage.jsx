import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { usePharmacy } from '../../context/PharmacyContext';

export default function PrescriptionUploadPage() {
  const { addPrescription } = usePharmacy();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [step, setStep] = useState(1); // 1: Upload | 2: Patient Info | 3: Review | 4: Success
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [patientInfo, setPatientInfo] = useState({
    patientName: '',
    phone: '',
    email: '',
    notes: '',
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setFileError('File size exceeds 10MB limit. Please upload a smaller photo or PDF.');
      return;
    }

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(selectedFile.type)) {
      setFileError('Unsupported file format. Please upload JPG, PNG, or PDF.');
      return;
    }

    setFileError('');
    setFile({
      name: selectedFile.name,
      size: (selectedFile.size / 1024).toFixed(1) + ' KB',
      type: selectedFile.type,
      rawFile: selectedFile,
    });
  };

  const handlePatientInfoChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPrescription = (e) => {
    e.preventDefault();
    if (!file) {
      setFileError('Please select a prescription file first.');
      return;
    }

    const prescriptionRecord = {
      id: `rx-${Date.now()}`,
      fileName: file.name,
      fileSize: file.size,
      patientName: patientInfo.patientName || 'Patient',
      phone: patientInfo.phone,
      email: patientInfo.email,
      notes: patientInfo.notes,
      uploadedAt: new Date().toISOString(),
      status: 'pending_review',
    };

    addPrescription(prescriptionRecord);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-neutral-50/60 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200/80 pt-8 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-4" aria-label="Breadcrumb">
            <Link to={ROUTES.HOME} className="hover:text-primary-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to={ROUTES.PHARMACY} className="hover:text-primary-600 transition-colors">Pharmacy</Link>
            <span>/</span>
            <span className="text-neutral-900 font-semibold" aria-current="page">Upload Prescription</span>
          </nav>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Prescription Upload Portal
          </h1>
          <p className="text-sm text-neutral-500 mt-1 max-w-2xl">
            Upload your doctor's prescription. Our certified clinical pharmacists will review your medications and contact you for doorstep delivery.
          </p>

          {/* Stepper indicator */}
          <div className="flex items-center justify-between max-w-lg mt-6">
            {[
              { num: 1, label: 'Upload' },
              { num: 2, label: 'Patient Info' },
              { num: 3, label: 'Review' },
              { num: 4, label: 'Confirmation' },
            ].map((s, idx, arr) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      step >= s.num ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    {s.num}
                  </span>
                  <span className={`text-xs font-semibold hidden sm:inline ${step >= s.num ? 'text-neutral-900' : 'text-neutral-400'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < arr.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${step > s.num ? 'bg-primary-600' : 'bg-neutral-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/80 shadow-sm">
          
          {/* STEP 1: Upload File */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-1">
                  1. Choose Prescription Image or Document
                </h2>
                <p className="text-xs text-neutral-500">
                  Please ensure the doctor's name, patient name, and medicines are clearly legible.
                </p>
              </div>

              {fileError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                  {fileError}
                </div>
              )}

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className="border-2 border-dashed border-neutral-300 hover:border-primary-500 rounded-3xl p-8 sm:p-12 text-center cursor-pointer bg-neutral-50/50 hover:bg-primary-50/20 transition-all duration-200"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  className="hidden"
                />
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-100/70 text-primary-700 flex items-center justify-center text-3xl mb-4">
                  📄
                </div>
                <h3 className="text-base font-bold text-neutral-900 mb-1">
                  Click to select or drag and drop prescription
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-4">
                  Supported formats: JPG, PNG, WEBP, or PDF (Max size: 10MB)
                </p>
                <span className="inline-block px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm">
                  Choose File from Device
                </span>
              </div>

              {/* Selected File Card */}
              {file && (
                <div className="p-4 bg-primary-50/50 rounded-2xl border border-primary-200 flex items-center justify-between">
                  <div className="flex items-center gap-3 truncate">
                    <span className="text-2xl">📎</span>
                    <div className="truncate">
                      <div className="font-bold text-sm text-neutral-900 truncate">{file.name}</div>
                      <div className="text-xs text-neutral-500">{file.size} • Ready for verification</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-white"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Confidentiality Box */}
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 text-xs text-neutral-600 space-y-1">
                <span className="font-semibold text-neutral-900 block">🔒 Privacy & HIPAA Commitment</span>
                <p className="text-[11px] text-neutral-500">
                  Prescription images are encrypted and stored in confidential, non-public medical archives accessed solely by licensed pharmacists.
                </p>
              </div>

              <div className="flex justify-end pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => {
                    if (!file) {
                      setFileError('Please select a file first.');
                      return;
                    }
                    setStep(2);
                  }}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
                >
                  Continue to Patient Info →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Patient Info */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-1">
                  2. Patient Contact & Details
                </h2>
                <p className="text-xs text-neutral-500">
                  Who is this prescription for? Our pharmacist will call to confirm dosages.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Patient Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    required
                    value={patientInfo.patientName}
                    onChange={handlePatientInfoChange}
                    placeholder="e.g. Jane Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={patientInfo.phone}
                      onChange={handlePatientInfoChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={patientInfo.email}
                      onChange={handlePatientInfoChange}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Special Notes or Specific Brand Preferences (Optional)
                  </label>
                  <textarea
                    rows={3}
                    name="notes"
                    value={patientInfo.notes}
                    onChange={handlePatientInfoChange}
                    placeholder="e.g. Please supply generic equivalent if available, or call in the afternoon"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-neutral-600 hover:bg-neutral-100 rounded-xl text-xs font-semibold transition-colors"
                >
                  ← Back to File
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!patientInfo.patientName.trim() || !patientInfo.phone.trim()) {
                      alert('Please provide patient name and contact phone number.');
                      return;
                    }
                    setStep(3);
                  }}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
                >
                  Review Submission →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Review */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-1">
                  3. Review Prescription Submission
                </h2>
                <p className="text-xs text-neutral-500">
                  Please confirm the information before sending to our clinical pharmacy team.
                </p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/70 space-y-3 text-xs text-neutral-700">
                <div className="flex justify-between pb-2 border-b border-neutral-200/60">
                  <span className="font-semibold text-neutral-500">Attached File:</span>
                  <span className="font-bold text-neutral-900">{file?.name} ({file?.size})</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-neutral-200/60">
                  <span className="font-semibold text-neutral-500">Patient:</span>
                  <span className="font-bold text-neutral-900">{patientInfo.patientName}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-neutral-200/60">
                  <span className="font-semibold text-neutral-500">Phone:</span>
                  <span className="font-bold text-neutral-900">{patientInfo.phone}</span>
                </div>
                {patientInfo.email && (
                  <div className="flex justify-between pb-2 border-b border-neutral-200/60">
                    <span className="font-semibold text-neutral-500">Email:</span>
                    <span className="font-bold text-neutral-900">{patientInfo.email}</span>
                  </div>
                )}
                {patientInfo.notes && (
                  <div className="pt-1">
                    <span className="font-semibold text-neutral-500 block mb-0.5">Notes:</span>
                    <span className="text-neutral-800">{patientInfo.notes}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-neutral-600 hover:bg-neutral-100 rounded-xl text-xs font-semibold transition-colors"
                >
                  ← Edit Info
                </button>
                <button
                  type="button"
                  onClick={handleSubmitPrescription}
                  className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-base transition-all shadow-md shadow-emerald-600/20 active:scale-[0.98]"
                >
                  Submit Prescription to Pharmacist
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Success Confirmation */}
          {step === 4 && (
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-4xl border border-emerald-200 shadow-sm animate-in zoom-in-50 duration-300">
                ✓
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-2">
                  Prescription Received!
                </h2>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-neutral-900">{patientInfo.patientName}</strong>. Our clinical pharmacist is reviewing your prescription and will contact you at <strong className="text-neutral-900">{patientInfo.phone}</strong> to confirm your medication basket and delivery address.
                </p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/70 max-w-md mx-auto text-xs text-neutral-600 text-left space-y-2">
                <div className="font-bold text-neutral-900">What happens next:</div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center text-[10px]">1</span>
                  <span>Pharmacist reviews medicine dosages and stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center text-[10px]">2</span>
                  <span>We call you to confirm pricing & address</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center text-[10px]">3</span>
                  <span>Dispatched same-day in sealed packaging</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                <Link
                  to={ROUTES.PHARMACY}
                  className="px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
                >
                  Return to Pharmacy Home
                </Link>
                <Link
                  to={ROUTES.PHARMACY_MEDICINES}
                  className="px-6 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl font-semibold text-sm transition-colors"
                >
                  Browse OTC Products
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
