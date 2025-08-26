export default function ParaphraseButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`bg-lime-300 cursor-pointer hover:bg-[#D2F159] text-gray-900 font-medium px-8 py-3 rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D2F159] focus:ring-offset-1 ms-auto flex items-center justify-center gap-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      ) : null}
      {loading ? 'Paraphrasing...' : 'Paraphrase'}
    </button>
  )
}