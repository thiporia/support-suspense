/*
Artist2 에서는 데이터 페칭이 반복될 때마다 계속 코드가 반복되기 때문에
hooks 을 통해 반복되는 코드를 줄일 수 있다

하지만 훅으로 아무리 좋게 설정하고 비즈니스 로직을 훅에 숨긴다 하여도
결국은 컴포넌트에서 조건 처리가 필요하다

참고 문서는 여기서 독자의 상상을 유도한다
'만약 우리가 SpinnerFallback, ErrorFallback을 useFetch를 통해서 처리할 수 있다면 어떨까?

결국 Suspense 가 해내는 일은 SpinnerFallback 에 대한 처리이다
*/
const Artist = ({ artistName }) => {
    const [artistInfo, isPending, error] = useFetch(`https://api/artists/${artistName}`)

    // This isn't much, but you will need to do this every time
    if (isPending) return <SpinnerFallback />
    if (error !== null) return <ErrorFallback />

    return (
        <div>
            <h2>{artistName}</h2>
            <p>{artistInfo.bio}</p>
            <Album albumName={artistInfo.lastAlbumName}>
        </div>
    )
}

const Album = ({ albumName }) => {
     const [albumInfo, isPending, error] = useFetch(`https://api/artists/${albumName}`)

    // This isn't much, but you will need to do this every time
    if (isPending) return <SpinnerFallback />
    if (error !== null) return <ErrorFallback />

    return ...
}
