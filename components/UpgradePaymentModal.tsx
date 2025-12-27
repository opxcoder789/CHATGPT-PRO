import React, { useState, startTransition } from "react";
import { XIcon } from "./Icons";

interface UpgradePaymentModalProps {
    onClose: () => void;
}

export const UpgradePaymentModal: React.FC<UpgradePaymentModalProps> = ({ onClose }) => {
    const [country, setCountry] = useState("Germany");
    const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4321");
    const [validUntil, setValidUntil] = useState("07/23");
    const [cvc, setCvc] = useState("187");
    const [isChecked, setIsChecked] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);

    const countries = [
        { name: "Germany", flag: "🇩🇪" },
        { name: "United States", flag: "🇺🇸" },
        { name: "United Kingdom", flag: "🇬🇧" },
        { name: "France", flag: "🇫🇷" },
        { name: "India", flag: "🇮🇳" },
    ];

    const handlePay = () => {
        startTransition(() => setShowMessage(true));
        setTimeout(() => {
            startTransition(() => setShowMessage(false));
        }, 3000);
    };

    const handlePaytmPay = () => {
        if (typeof window !== "undefined") {
            const upiLink = `upi://pay?pa=8604328478@paytm&pn=Payment&am=499&cu=INR&tn=Payment for Plan Activation`;
            window.open(upiLink, "_blank");
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleCountrySelect = (countryName: string) => {
        startTransition(() => {
            setCountry(countryName);
            setShowCountryDropdown(false);
        });
    };

    // Styling constants derived from the Framer design
    const styles = {
        backgroundColor: "#000000",
        titleColor: "#FFFFFF",
        labelColor: "#CCCCCC",
        inputBackground: "#111111",
        inputColor: "#FFFFFF",
        borderColor: "#333333",
        buttonColor: "#CCCCCC",
        buttonTextColor: "#000000",
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" 
                onClick={onClose}
            />
            
            <div className="w-full max-w-[500px] bg-black border border-white/10 rounded-[32px] overflow-hidden relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
                
                {/* Header with Close */}
                <div className="absolute top-4 right-4 z-20">
                    <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white">
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto custom-scrollbar">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-white mb-8 tracking-tight">Payment Method</h1>

                    <div className="flex flex-col gap-6">
                        
                        {/* Country Dropdown */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-medium tracking-wider text-[#CCCCCC] uppercase">Country</label>
                            <div
                                onClick={() => setShowCountryDropdown(true)}
                                className="w-full bg-[#111111] text-white border-b border-[#333333] py-2 cursor-pointer text-[15px] flex items-center gap-2"
                            >
                                <span>{countries.find((c) => c.name === country)?.flag}</span>
                                <span>{country}</span>
                            </div>
                        </div>

                        {/* Card Number */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-medium tracking-wider text-[#CCCCCC] uppercase">Card Number</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    className="w-full bg-[#111111] text-white border-b border-[#333333] py-2 outline-none text-[15px] focus:border-white transition-colors"
                                />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-1">
                                    <div className="w-8 h-5 rounded-full bg-[#EB001B]" />
                                    <div className="w-8 h-5 rounded-full bg-[#FF5F00] -ml-4 mix-blend-screen" />
                                </div>
                            </div>
                        </div>

                        {/* Valid Until & CVC */}
                        <div className="flex gap-6">
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-[11px] font-medium tracking-wider text-[#CCCCCC] uppercase">Valid Until</label>
                                <input
                                    type="text"
                                    value={validUntil}
                                    onChange={(e) => setValidUntil(e.target.value)}
                                    className="w-full bg-[#111111] text-white border-b border-[#333333] py-2 outline-none text-[15px] focus:border-white transition-colors"
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-[11px] font-medium tracking-wider text-[#CCCCCC] uppercase">CVC</label>
                                <input
                                    type="text"
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value)}
                                    className="w-full bg-[#111111] text-white border-b border-[#333333] py-2 outline-none text-[15px] focus:border-white transition-colors"
                                />
                            </div>
                        </div>

                        {/* Checkbox */}
                        <label className="flex items-start gap-3 cursor-pointer mt-2 group">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                                className="mt-1 w-4 h-4 accent-white bg-[#333] border-none rounded cursor-pointer"
                            />
                            <span className="text-[11px] font-medium text-[#CCCCCC] leading-snug group-hover:text-white transition-colors">
                                Payment Address is the same as the Delivery Address
                            </span>
                        </label>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={handleCancel}
                                className="flex-1 py-4 bg-transparent border border-[#333333] text-[#CCCCCC] font-semibold text-[15px] hover:bg-[#111] hover:text-white transition-all rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePay}
                                className="flex-1 py-4 bg-[#CCCCCC] text-black font-semibold text-[15px] hover:bg-white transition-all rounded-lg"
                            >
                                Pay ₹499
                            </button>
                        </div>

                        {/* Pay via Paytm */}
                        <button
                            onClick={handlePaytmPay}
                            className="w-full py-5 relative overflow-hidden rounded-2xl group transition-all duration-300 transform hover:-translate-y-0.5"
                            style={{
                                background: "linear-gradient(135deg, rgba(0, 186, 242, 0.9) 0%, rgba(0, 150, 255, 0.8) 100%)",
                                boxShadow: "0 8px 32px rgba(0, 186, 242, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
                            }}
                        >
                            <div className="flex items-center justify-center gap-3 relative z-10">
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" 
                                    alt="Paytm"
                                    className="w-8 h-8 object-contain filter drop-shadow-md brightness-200"
                                />
                                <span className="font-bold text-white text-lg drop-shadow-sm">Pay via Paytm - ₹499</span>
                            </div>
                            
                            {/* Shine effect */}
                            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/10 to-transparent rotate-45 pointer-events-none group-hover:animate-[shine_1.5s_infinite]" />
                        </button>

                    </div>
                </div>

                {/* Country Dropdown Overlay */}
                {showCountryDropdown && (
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-md z-30 flex items-center justify-center p-8 animate-in fade-in duration-200"
                        onClick={() => setShowCountryDropdown(false)}
                    >
                        <div 
                            className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold text-white mb-4">Select Country</h3>
                            <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
                                {countries.map((c) => (
                                    <div
                                        key={c.name}
                                        onClick={() => handleCountrySelect(c.name)}
                                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border border-transparent ${country === c.name ? 'bg-white/10 border-white/20' : 'hover:bg-white/5 hover:border-white/10'}`}
                                    >
                                        <span className="text-2xl">{c.flag}</span>
                                        <span className="text-white text-[15px]">{c.name}</span>
                                        {country === c.name && <span className="ml-auto text-white">✓</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Success/Error Message Overlay */}
                {showMessage && (
                    <div className="absolute inset-0 bg-black/90 z-40 flex items-center justify-center p-8 animate-in fade-in duration-300">
                        <div className="text-center">
                            <div className="w-16 h-16 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500 text-3xl font-bold">!</div>
                            <div className="text-white text-xl font-bold mb-2">Payment Required</div>
                            <div className="text-gray-400">Try pay via payment to active plan</div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};