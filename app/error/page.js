export default function ErrorPage({ searchParams }) {
  const errMsg =  searchParams?.message || "Sorry, something went wrong";

  return (<div className="flex flex-wrap content-center justify-center h-screen"><p className="">{errMsg}</p></div>)
}