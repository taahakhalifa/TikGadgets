import MaxWidthWrapper from "../components/MaxWidthWrapper"

export default function Home() {
  return (<MaxWidthWrapper>
    <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
      <h1 className="text-4xl font-bold tracking-tight">Uncover TikTok's Hidden Gems: Must-Have <span className='text-blue-600'>Products</span> and <span className='text-blue-600'>Gadgets</span>.</h1>
    </div>
  </MaxWidthWrapper>
  )
}
