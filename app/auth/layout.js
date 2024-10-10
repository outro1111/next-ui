import Image from "next/image"

export default function AuthLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col sm:-ml-14">
      <div className="themes-wrapper bg-background w-full h-screen flex flex-col items-center justify-center px-4 bg-muted/40 bg-auto bg-center bg-no-repeat bg-[url('../public/images/login-bg-w.jpg')] dark:bg-[url('../public/images/login-bg-b.jpg')]">
          <h1 className="w-full max-w-md -mt-28 mb-10 text-3xl font-bold">
            <div className="w-48 m-auto">
              <Image
                src="/images/logo-b.svg"
                alt="Cellink"
                width={500}
                height={300}
                className="block dark:hidden"
              />
              <Image
                src="/images/logo-w.svg"
                alt="Cellink"
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