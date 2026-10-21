export default function SectionTitle({ kicker, title, sub }) {
  return (
    <div className="text-center mb-8 sm:mb-10">
      {kicker && (
        <span className="text-xs sm:text-sm font-black t-red inline-block mb-3">
          {kicker}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black t-ink leading-[1.3]">
        {title}
      </h2>
      {sub && <p className="t-soft mt-2.5 text-sm sm:text-base max-w-lg mx-auto leading-7">{sub}</p>}
    </div>
  );
}
