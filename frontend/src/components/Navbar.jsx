import { PlusIcon } from 'lucide-react'
import { Link } from 'react-router'

function Navbar() {
    return <header className="bg-base-300 border-b border-base-content/10">
        <div className='mx-auto max-w-6x1 p-4'>
            <div className='flex justify-between items-center'>
                <h1 className={`text-3xl font-bold font-mono tracking-tight text-purple-300`}>
                        EzNotes
                </h1>
                {/* right hand side the button*/}
                <div className='flex items-center gap-4'>
                    <Link to={"create"} className="btn bnt-primary text-purple-300">
                        <PlusIcon className='size-5'/>
                        <span>New Note</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  
}

export default Navbar