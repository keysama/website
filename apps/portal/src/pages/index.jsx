export default function Index({time}){
    return (
        <div>
            <h1>Hello Protal</h1>
            time: {time}
        </div>
    )
}

export async function getServerSideProps(){
    const date = Date.now();
    return {
        props: {
            time: date
        }
    }
}