import { useEffect, useState } from 'react'

/*
Artist1 에서는 없었던 오류 처리를 위한 error
보류 중인 상태를 처리하기 위한 isPending
useEffect 내부에 stale 을 통한 요청 완료 후 갱신 필요를 마킹
artistName 이 변경 되면 이 일을 다시 시작한다
마찬가지로 진행 중이어도 artistName 이 변경된다면 이전 요청은 cleanup 에서 만료된다
그럼 stale = true  는 어떤 의미일까?
stale = true 는 Reactjs 내에서 언마운트 된 컴포넌트에 의해서 상태업데이트가 진행되는 것을
방지할 수 있다
*/
const Artist = ({ artistName }) => {
    const [artistInfo, setArtistInfo] = useState(null)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        let stale = false
        setIsPending(true)
        setError(null)

        fetch(`https://api/artists/${artistName}`)
            .then(res => res.json())
            .then(json => {
                if (!stale) {
                    setIsPending(false)
                    setArtistInfo(json)
                }
            })
            .catch(err => setError(err))

        // This is basically what AbortController does
        return () => { stale = true }
    }, [artistName])

    if (isPending) return <SpinnerFallback />
    if (error !== null) return <ErrorFallback />

    return (
        <div>
            <h2>{artistName}</h2>
            <p>{artistInfo?.bio}</p>
        </div>
    )
}
