import { useState } from 'react'

import ResponsiveAppBar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
<ResponsiveAppBar />  
    </div>
  )
}

export default App
