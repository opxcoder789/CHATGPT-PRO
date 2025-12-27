import React, { useState } from 'react';
import { AppleIcon, GoogleIcon, BigEnvelopeIcon } from './Icons';

interface LandingScreenProps {
    onEmailSignup: () => void;
    onLogin: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onEmailSignup, onLogin }) => {
    return (
        <div className="flex flex-col h-screen w-full bg-[#00555A] text-white relative overflow-hidden">
            {/* Logo Area */}
            <div className="flex-1 flex flex-col items-center justify-center mb-20">
                <div className="flex items-center gap-2">
                    <span className="text-4xl font-semibold tracking-tight">ChatGPT</span>
                    <div className="w-6 h-6 rounded-full bg-[#FFD868] mt-2"></div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="w-full px-5 pb-10 flex flex-col gap-3 animate-in slide-in-from-bottom-10 duration-500">
                <button className="w-full bg-white text-black font-medium h-12 rounded-full flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                    <AppleIcon />
                    Continue with Apple
                </button>
                
                <button className="w-full bg-[#1A666A] border border-[#2D7377] text-white font-medium h-12 rounded-full flex items-center justify-center gap-2 hover:bg-[#236e72] transition-colors">
                    <GoogleIcon />
                    Continue with Google
                </button>

                <button 
                    onClick={onEmailSignup}
                    className="w-full bg-[#1A666A] border border-[#2D7377] text-white font-medium h-12 rounded-full flex items-center justify-center gap-2 hover:bg-[#236e72] transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Sign up with email
                </button>

                <button 
                    onClick={onLogin}
                    className="w-full bg-transparent border border-black/30 text-white font-medium h-12 rounded-full flex items-center justify-center gap-2 hover:bg-black/10 transition-colors mt-1"
                >
                    Log in
                </button>
            </div>
        </div>
    );
};

interface EmailInputScreenProps {
    onContinue: (email: string) => void;
    onBack: () => void;
}

export const EmailInputScreen: React.FC<EmailInputScreenProps> = ({ onContinue, onBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="flex flex-col h-screen w-full bg-white text-zinc-900 px-6 pt-12">
            <button onClick={onBack} className="text-zinc-500 mb-8 -ml-2 p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            <h1 className="text-3xl font-bold mb-8">Create your account</h1>

            <div className="flex flex-col gap-4">
                <div>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="w-full h-14 bg-zinc-50 border border-zinc-200 rounded-lg px-4 text-lg focus:ring-2 focus:ring-[#00555A] focus:border-transparent outline-none transition-all"
                        autoFocus
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full h-14 bg-zinc-50 border border-zinc-200 rounded-lg px-4 text-lg focus:ring-2 focus:ring-[#00555A] focus:border-transparent outline-none transition-all"
                    />
                </div>
            </div>

            <button 
                onClick={() => {
                    if (email && password) onContinue(email);
                }}
                disabled={!email || !password}
                className="w-full bg-[#10a37f] text-white font-medium h-14 rounded-lg mt-6 hover:bg-[#0d8a6a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
                Continue
            </button>
        </div>
    );
};


interface VerifyEmailScreenProps {
    email: string;
    onVerified: () => void;
    onSignOut: () => void;
}

export const VerifyEmailScreen: React.FC<VerifyEmailScreenProps> = ({ email, onVerified, onSignOut }) => {
    return (
        <div className="flex flex-col h-screen w-full bg-white text-zinc-900 items-center justify-center px-6 relative">
            <div className="flex-1 flex flex-col items-center justify-center max-w-sm text-center">
                <div className="mb-8">
                    <BigEnvelopeIcon />
                </div>
                
                <h1 className="text-3xl font-bold mb-3 text-black tracking-tight">Verify your email</h1>
                
                <p className="text-zinc-500 text-[17px] leading-relaxed">
                    Tap on the link we sent to <br/>
                    <span className="font-semibold text-zinc-800">{email || "pratamaiosi@gmail.com"}</span>
                </p>
            </div>

            <div className="w-full pb-10 flex flex-col gap-3">
                 <button 
                    onClick={onVerified}
                    className="w-full bg-[#EAEAEA] text-[#111111] font-semibold h-14 rounded-xl flex items-center justify-center hover:bg-[#d4d4d4] transition-colors text-[17px]"
                >
                    I've verified my email
                </button>
                <button 
                    onClick={onSignOut}
                    className="w-full bg-[#EAEAEA] text-[#111111] font-semibold h-14 rounded-xl flex items-center justify-center hover:bg-[#d4d4d4] transition-colors text-[17px]"
                >
                    Sign out
                </button>
            </div>
        </div>
    );
};
