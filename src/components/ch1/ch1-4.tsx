/*
그렇다면 SpinnerFallback, ErrorFallback 을 useFetch 가 해결해준다면 어떤일이 벌어질까?
일반적으로 Error에 대한 처리는 ErrorBoundary 가 있고, 누구든 수월하게 구현하고 적용할 수 있다
이 친구는 throw 된 error 를 감지해서 ErrorFallback 을 보여주는 역할을 한다
던져진 Error 는 경계를 만날 때까지 거슬러 올라간다

isPending 은 어떻게 되는걸까..?
*/
const Artist = ({ artistName }) => {
    const [artistInfo, isPending, error] = useFetch(`https://api/artists/${artistName}`)

    if (isPending) return <SpinnerFallback />
    // Handle at the nearest error boundary (you can move this into useFetch)
    if (error !== null) return throw error

    return (
        <div>
            <h2>{artistName}</h2>
            <p>{artistInfo.bio}</p>
            <Album albumName={artistInfo.lastAlbumName}>
        </div>
    )
}

const App = () => {
    return (
        <ErrorBoundary fallback={<ErrorFallback />}>
            <Artist artistName="Julian Casablanca" />
        </ErrorBoundary>
    )
}
