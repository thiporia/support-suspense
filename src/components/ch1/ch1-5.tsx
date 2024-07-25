/*
SpinnerFallback 을 처리하는 건 Suspense 가 하는 일이다
컴포넌트가 바라보는 시점에서는 Artist 는 너무 당연히도 해야할 일만 수행한다
Artist 를 감싸고 있는 컴포넌트쪽에서 에러와 보류 처리를 위해 선언되어 있다
ErrorBoundary, Suspense

useFetch가 궁금하겠지만 이해하기 위해서는 먼저 다음 챕터로 넘어가보자
*/

const Artist = ({ artistName }) => {
    // Wow! Our hook implicitly handles both errors, and loading states now!
    const [artistInfo] = useFetch(`https://api/artists/${artistName}`)

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
            <Suspense fallback={<SpinnerFallback />}>
                <Artist artistName="Julian Casablanca" />
            </Supense>
        </ErrorBoundary>
    )
}
