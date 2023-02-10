function Home({name}){
    return (
        <div>
            <h1>hello Blog</h1>
            <div>
                {
                    name
                }
            </div>
        </div>
    )
}

export default Home;

export async function getStaticProps(){
    return {
        props: {
            name : 1
        }
    }
} 