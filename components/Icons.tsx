import React from 'react';

export const MenuIcon = ({ color = "currentColor", className = "" }: { color?: string, className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M3 8.5H21" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 15.5H16" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const PenIcon = ({ color = "currentColor", className = "" }: { color?: string, className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M16.9497 3.53553L18.364 2.12132C19.145 1.34027 20.4114 1.34027 21.1924 2.12132C21.9734 2.90237 21.9734 4.16871 21.1924 4.94975L19.7782 6.36396M16.9497 3.53553L6.34315 14.1421L5.63604 18.3848L9.87868 17.6777L20.4853 7.07107M16.9497 3.53553L20.4853 7.07107" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const StopIcon = ({ className = "" }: { className?: string }) => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="15" cy="15" r="15" fill="white" className="fill-white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M12.5673 10.8333H17.4327C17.6524 10.8332 17.8419 10.8332 17.9979 10.846C18.1627 10.8594 18.3265 10.8892 18.4842 10.9695C18.7194 11.0893 18.9106 11.2806 19.0304 11.5158C19.1108 11.6734 19.1405 11.8373 19.1539 12.002C19.1667 12.1581 19.1667 12.3475 19.1667 12.5672V17.4327C19.1667 17.6523 19.1667 17.8418 19.1539 17.9978C19.1405 18.1626 19.1108 18.3264 19.0304 18.4841C18.9106 18.7193 18.7194 18.9105 18.4842 19.0303C18.3265 19.1107 18.1627 19.1404 17.9979 19.1538C17.8419 19.1666 17.6524 19.1666 17.4327 19.1666H12.5673C12.3476 19.1666 12.1582 19.1666 12.0021 19.1538C11.8374 19.1404 11.6735 19.1107 11.5159 19.0303C11.2807 18.9105 11.0894 18.7193 10.9696 18.4841C10.8893 18.3264 10.8595 18.1626 10.8461 17.9978C10.8333 17.8418 10.8333 17.6523 10.8333 17.4326V12.5672C10.8333 12.3475 10.8333 12.1581 10.8461 12.002C10.8595 11.8373 10.8893 11.6734 10.9696 11.5158C11.0894 11.2806 11.2807 11.0893 11.5159 10.9695C11.6735 10.8892 11.8374 10.8594 12.0021 10.846C12.1582 10.8332 12.3476 10.8332 12.5673 10.8333Z" fill="black"/>
    </svg>
)

export const PlusIcon = ({ className = "" }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export const XIcon = ({ className = "" }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export const ShareIcon = ({ className = "" }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 6L12 2L8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export const ChevronDownIcon = ({ className = "" }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export const MicrophoneIcon = ({ className = "" }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C10.3431 2 9 3.34315 9 5V11C9 12.6569 10.3431 14 12 14C13.6569 14 15 12.6569 15 11V5C15 3.34315 13.6569 2 12 2ZM11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5V11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11V5Z" fill="currentColor"/>
        <path d="M5 11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11H21C21 15.4952 17.7018 19.2223 13.4354 19.8973C13.6192 20.0682 13.7846 20.2582 13.9289 20.4645L15.3289 22.4645C15.5398 22.7658 15.3242 23.1818 14.9569 23.1818H9.04306C8.67584 23.1818 8.46019 22.7658 8.67106 22.4645L10.0711 20.4645C10.2154 20.2582 10.3808 20.0682 10.5646 19.8973C6.29819 19.2223 3 15.4952 3 11H5Z" fill="currentColor"/>
    </svg>
)

export const HeadphoneIcon = ({ className = "" }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12V18.5C22 20.433 20.433 22 18.5 22C16.567 22 15 20.433 15 18.5V16.5C15 14.567 16.567 13 18.5 13C19.0368 13 19.5454 13.1208 20 13.3368V12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12V13.3368C4.45463 13.1208 4.9632 13 5.5 13C7.433 13 9 14.567 9 16.5V18.5C9 20.433 7.433 22 5.5 22C3.567 22 2 20.433 2 18.5V12Z" fill="currentColor"/>
    </svg>
)

export const OpenAIIcon = ({ className = "" }: { className?: string }) => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M13.8243 6.13817C13.992 5.63309 14.05 5.09804 13.9944 4.56876C13.9388 4.03947 13.771 3.52814 13.502 3.06892C13.1032 2.37481 12.4943 1.82527 11.7631 1.49952C11.0319 1.17377 10.2161 1.08865 9.43335 1.25642C8.98866 0.761774 8.42165 0.392842 7.78926 0.18668C7.15687 -0.0194823 6.48136 -0.0556156 5.83059 0.0819087C5.17981 0.219433 4.57668 0.525773 4.08176 0.970162C3.58685 1.41455 3.21758 1.98134 3.01104 2.61361C2.48958 2.72054 1.99695 2.93754 1.56607 3.2501C1.13519 3.56267 0.775992 3.9636 0.512474 4.42611C0.10937 5.11906 -0.0629135 5.92226 0.0205302 6.71957C0.103974 7.51689 0.438821 8.26701 0.976661 8.86148C0.808326 9.36632 0.749739 9.90128 0.804817 10.4306C0.859895 10.9599 1.02737 11.4713 1.29604 11.9307C1.69531 12.625 2.30474 13.1747 3.03648 13.5005C3.76822 13.8262 4.5845 13.9112 5.36766 13.7432C5.72095 14.1411 6.15505 14.459 6.64098 14.6757C7.12691 14.8924 7.65348 15.003 8.18554 15C8.98781 15.0007 9.76956 14.7465 10.418 14.274C11.0663 13.8016 11.5478 13.1353 11.7929 12.3714C12.3143 12.2642 12.8069 12.0472 13.2377 11.7346C13.6686 11.422 14.0278 11.0212 14.2915 10.5588C14.6898 9.86686 14.8591 9.06668 14.7752 8.2727C14.6913 7.47872 14.3585 6.73155 13.8243 6.13817ZM8.18554 14.0182C7.52849 14.0193 6.89204 13.789 6.38779 13.3677L6.47647 13.3175L9.46291 11.5936C9.53724 11.55 9.59895 11.4878 9.64198 11.4132C9.68501 11.3385 9.70788 11.254 9.70835 11.1678V6.95723L10.9708 7.68761C10.9771 7.69077 10.9825 7.69536 10.9866 7.70101C10.9908 7.70666 10.9935 7.7132 10.9946 7.72011V11.2092C10.993 11.9537 10.6966 12.6673 10.1701 13.1938C9.64363 13.7202 8.93005 14.0167 8.18554 14.0182ZM2.1476 11.4399C1.81808 10.8709 1.69977 10.2039 1.81347 9.5563L1.90222 9.60955L4.8916 11.3334C4.96557 11.3768 5.04978 11.3997 5.13554 11.3997C5.2213 11.3997 5.30551 11.3768 5.37947 11.3334L9.03122 9.22811V10.6859C9.03088 10.6934 9.02884 10.7008 9.02524 10.7074C9.02165 10.7141 9.0166 10.7199 9.01047 10.7243L5.9856 12.4689C5.34005 12.8407 4.57332 12.9413 3.85373 12.7483C3.13414 12.5554 2.52052 12.0848 2.1476 11.4399ZM1.3611 4.93473C1.6929 4.36209 2.21662 3.92532 2.83954 3.70173V7.24998C2.83841 7.33571 2.86031 7.42016 2.90296 7.49453C2.9456 7.5689 3.00742 7.63046 3.08197 7.6728L6.71597 9.76923L5.45341 10.4995C5.44658 10.5032 5.43896 10.5051 5.43122 10.5051C5.42349 10.5051 5.41587 10.5032 5.40904 10.4995L2.3901 8.75798C1.74576 8.38449 1.27569 7.77088 1.08283 7.05153C0.889963 6.33218 0.990024 5.56571 1.3611 4.91998V4.93473ZM11.7338 7.34461L8.08797 5.22748L9.3476 4.49998C9.35443 4.49636 9.36205 4.49446 9.36979 4.49446C9.37752 4.49446 9.38514 4.49636 9.39197 4.49998L12.4109 6.24455C12.8725 6.51089 13.2488 6.90305 13.4959 7.37524C13.743 7.84743 13.8506 8.38016 13.8063 8.91124C13.762 9.44231 13.5675 9.94982 13.2455 10.3745C12.9236 10.7992 12.4875 11.1235 11.9881 11.3097V7.76142C11.9855 7.67584 11.9607 7.59242 11.9161 7.51933C11.8715 7.44625 11.8087 7.38608 11.7338 7.34461ZM12.9905 5.45517L12.9017 5.40192L9.91829 3.6633C9.84387 3.61962 9.75914 3.5966 9.67285 3.5966C9.58656 3.5966 9.50183 3.61962 9.42741 3.6633L5.77872 5.76855V4.31086C5.77795 4.30345 5.77919 4.29596 5.78231 4.2892C5.78543 4.28243 5.79033 4.27664 5.79647 4.27242L8.81541 2.5308C9.27811 2.26425 9.80713 2.13495 10.3406 2.15802C10.8741 2.1811 11.39 2.35559 11.8279 2.6611C12.2659 2.96661 12.6078 3.3905 12.8137 3.88319C13.0196 4.37589 13.0809 4.91702 12.9905 5.4433L12.9905 5.45517ZM5.08966 8.03936L3.82716 7.31198C3.82085 7.30818 3.81544 7.30303 3.81134 7.29691C3.80723 7.29079 3.80453 7.28383 3.80341 7.27655V3.79636C3.80411 3.26247 3.95678 2.73981 4.24357 2.28948C4.53036 1.83916 4.93943 1.47979 5.42294 1.25338C5.90645 1.02698 6.44442 0.942897 6.97395 1.01097C7.50349 1.07904 8.0027 1.29646 8.41322 1.6378L8.32447 1.68811L5.3381 3.41186C5.26377 3.45545 5.20206 3.51763 5.15903 3.59228C5.116 3.66694 5.09313 3.7515 5.09266 3.83767L5.08966 8.03936ZM5.77566 6.56098L7.40191 5.62361L9.03122 6.56098V8.43561L7.40785 9.37292L5.77866 8.43561L5.77566 6.56098Z" fill="white"/>
    </svg>
)

export const SendIcon = ({ className = "" }: { className?: string }) => (
    <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="15" cy="16.6119" r="15" fill="black" className="fill-white dark:fill-white"/>
        <path d="M14.78 23.5213L14.0876 6.58521" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.813 13.8693L14.0876 6.58513L20.9362 13.3327" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export const CopyIcon = ({ className = "" }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M16 3H4V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 7H20V20H8V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export const CheckIcon = ({ className = "" }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export const Logo = OpenAIIcon;

export const CameraIcon = ({ className = "" }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const PhotoIcon = ({ className = "" }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const FolderIcon = ({ className = "" }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M22 19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V5C2 3.9 2.9 3 4 3H9L11 6H20C21.1 6 22 6.9 22 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const AppleIcon = ({ className = "" }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M17.4725 15.6575C16.4807 17.0863 15.4057 19.1675 13.6826 19.1675C12.012 19.1675 11.4795 18.1762 9.54075 18.1762C7.57638 18.1762 6.96763 19.13 5.40763 19.1675C3.77263 19.205 2.45763 17.3912 1.39263 15.8562C-0.787375 12.7088 0.835125 7.82625 4.39263 7.78875C6.07638 7.75125 7.23513 8.91875 8.29013 8.91875C9.30388 8.91875 10.7489 7.55625 12.7839 7.72875C13.6364 7.76625 16.0351 8.07375 17.5589 10.3012C17.4351 10.3762 15.1964 11.6925 15.2226 14.415C15.2451 16.635 17.1689 17.4412 17.4725 15.6575Z" fill="black" />
        <path d="M11.6663 5.25375C12.4463 4.30875 12.9676 2.9925 12.8251 1.68375C11.6663 1.7325 10.2638 2.45625 9.43135 3.4275C8.68885 4.2825 8.02885 5.62125 8.21635 6.8925C9.5101 6.99 10.8863 6.19875 11.6663 5.25375Z" fill="black" />
    </svg>
);

export const GoogleIcon = ({ className = "" }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
);

export const BigEnvelopeIcon = ({ className = "" }: { className?: string }) => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="48" cy="48" r="48" fill="#F3F4F6"/>
        <path d="M28 38L48 52L68 38" stroke="#111827" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="28" y="32" width="40" height="32" rx="4" stroke="#111827" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const SettingsSlidersIcon = ({ className = "" }: { className?: string }) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="9" cy="6" r="2.2" fill="currentColor"/>
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="15" cy="12" r="2.2" fill="currentColor"/>
      <line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="11" cy="18" r="2.2" fill="currentColor"/>
    </svg>
);
