import { useEffect } from 'react'

/*
일반적으로 우리는 fetch를 수행할 때 다음과 같이 데이터를 단순히 가져와서 useState 에 할당한다 
이걸로 충분할까? aristInfo.bio는 에러없이 잘 나타날까?

여기서 누락된건
- 오류 상태 처리
- 보류 중인 상태 처리
- 경쟁 조건 처리
- 캐시 공유
 */
const Artist = ({ artistName }) => {
    const [artistInfo, setArtistInfo] = useState(null)
    
    useEffect(() => {
        fetch(`https://api/artists/${artistName}`)
            .then(res => res.json())
            .then(json => setArtistInfo(json))
    }, [artistName])

    return (
        <div>
            <h2>{artistName}</h2>
            <p>{artistInfo.bio}</p>
        </div>
    )
}
