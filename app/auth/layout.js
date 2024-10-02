import Image from "next/image"

export default function AuthLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col sm:-ml-14">
      <div className="themes-wrapper bg-background w-full h-screen flex flex-col items-center justify-center px-4 bg-muted/40 bg-[length:100%_auto] bg-no-repeat bg-[url('../public/images/main-bg.png')] dark:bg-none">
          <h1 className="w-full max-w-md -mt-28 mb-5 text-3xl font-bold">
            <div className="w-48 m-auto">
              <Image
                src="/images/logo_b.svg"
                alt="Image"
                width={500}
                height={300}
                className="block dark:hidden"
              />
              <Image
                src="/images/logo_w.svg"
                alt="Image"
                width={500}
                height={300}
                className="hidden dark:block"
              />
            </div>
          </h1>
          {children}
      </div>
    </div>
  )
}