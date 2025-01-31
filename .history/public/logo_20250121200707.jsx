
export default function Logo() {
    return (
      <div className="inline-block">
        <svg
          width="200"
          height="80"
          viewBox="0 0 200 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform hover:scale-105 transition-transform duration-200"
        >
          {/* r */}
          <path d="M20 50c0-8.284 6.716-15 15-15h5v15c0 8.284-6.716 15-15 15s-15-6.716-15-15h10z" fill="#FF6B6B" />
          {/* e */}
          <path
            d="M45 50c0-8.284 6.716-15 15-15h15v30H45V50zm30 0h-15"
            stroke="#4ECDC4"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* s */}
          <path d="M85 35c8.284 0 15 6.716 15 15v15c-8.284 0-15-6.716-15-15V35z" fill="#FFD93D" />
          <path d="M115 65c-8.284 0-15-6.716-15-15v-15c8.284 0 15 6.716 15 15v15z" fill="#FFD93D" />
          {/* e */}
          <path
            d="M120 50c0-8.284 6.716-15 15-15h15v30h-30V50zm30 0h-15"
            stroke="#95E1D3"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* l */}
          <path
            d="M155 20h10v45c0 8.284-6.716 15-15 15s-15-6.716-15-15h10c0 2.761 2.239 5 5 5s5-2.239 5-5V20z"
            fill="#A8E6CF"
          />
          {/* l */}
          <path
            d="M170 20h10v45c0 8.284-6.716 15-15 15s-15-6.716-15-15h10c0 2.761 2.239 5 5 5s5-2.239 5-5V20z"
            fill="#3498DB"
          />
          {/* i */}
          <circle cx="185" cy="25" r="5" fill="#FF9A9E" />
          <path
            d="M180 40h10v25c0 8.284-6.716 15-15 15s-15-6.716-15-15h10c0 2.761 2.239 5 5 5s5-2.239 5-5V40z"
            fill="#FF9A9E"
          />
          {/* c */}
          <path
            d="M195 50c0-8.284 6.716-15 15-15s15 6.716 15 15-6.716 15-15 15-15-6.716-15-15zm15 5c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z"
            fill="#FC5C65"
          />
          {/* a */}
          <path
            d="M240 50c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15zm-15 5c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z"
            fill="#FD9644"
          />
        </svg>
      </div>
    )
  }
  
  