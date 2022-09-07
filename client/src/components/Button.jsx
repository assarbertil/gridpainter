/**
 * Primary button component used throughout the app
 */
export const Button = ({ onClick, children, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-1 font-medium rounded shadow text-slate-900 bg-sky-300 disabled:bg-slate-300 disabled:text-slate-700 hover:bg-sky-400 shadow-sky-700/40 disabled:shadow-slate-700/40"
    >
      {children}
    </button>
  )
}
