/**
 * LoadingSpinner
 * Props: size ('sm'|'md'|'lg'), text (optional label)
 */
export default function LoadingSpinner({ size = 'md', text }) {
  const dim = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }[size]

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div
        className={`${dim} rounded-full border-2 border-forest-200 border-t-forest-600
                    animate-spin`}
      />
      {text && (
        <p className="text-forest-500 text-sm animate-pulse">{text}</p>
      )}
    </div>
  )
}
