"use client"

const Loader = ({otherStyles}: {otherStyles: string}) => {
  return (
    <div className="flex items-center justify-center">
        <div
          className={`inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] ${otherStyles}`}
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
    </div>
  )
}

export default Loader