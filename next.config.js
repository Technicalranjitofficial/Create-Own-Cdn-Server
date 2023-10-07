/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:true,
        serverActionsBodySizeLimit: '10mb',
        
        
    },
    
    images:{
        domains:['raw.githubusercontent.com']
    }
}

module.exports = nextConfig
