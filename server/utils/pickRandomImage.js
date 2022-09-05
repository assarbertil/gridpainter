
import fs from "fs"

const files = fs.readdirSync(`/images/...`)
random_file = files[Math.floor(Math.random() * files.length)] 
files=files.filter(fileName=>fileName!==".DS_Store")
random_file = files[Math.floor(Math.random() * files.length)] 
