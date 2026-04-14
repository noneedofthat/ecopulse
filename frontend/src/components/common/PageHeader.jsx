/**
 * PageHeader — reusable dark green hero used on interior pages.
 *
 * Props:
 *   icon       — Lucide icon component
 *   badge      — optional badge text
 *   title      — main heading
 *   subtitle   — subheading text
 *   children   — optional slot for extra content (e.g. search bar)
 */
export default function PageHeader({ icon: Icon, badge, title, subtitle, children }) {
  return (
    <section className="bg-forest-900 text-white py-12">
      <div className="page-container">
        <div className="flex items-center gap-3 mb-4">
          {Icon && (
            <div className="w-10 h-10 rounded-xl bg-forest-700 flex items-center justify-center">
              <Icon size={20} className="text-forest-300" />
            </div>
          )}
          {badge && (
            <span className="badge bg-forest-700/60 text-forest-200 text-xs">
              {badge}
            </span>
          )}
        </div>
        <h1 className="section-title text-white mb-2">{title}</h1>
        {subtitle && (
          <p className="text-forest-300 max-w-xl leading-relaxed">{subtitle}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  )
}
