import { Inbox } from 'lucide-react'

/**
 * EmptyState — shown when a list/feed returns no results
 * Props: icon, title, message, action (node)
 */
export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  message,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-forest-100 flex items-center justify-center mb-4">
        <Icon size={28} className="text-forest-400" />
      </div>
      <h3 className="font-display text-xl font-bold text-forest-900 mb-2">{title}</h3>
      {message && (
        <p className="text-forest-500 max-w-sm text-sm leading-relaxed mb-6">{message}</p>
      )}
      {action && action}
    </div>
  )
}
