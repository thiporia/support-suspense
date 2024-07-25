/*
일반적으로 경계에 닿아버렸을 때 구성요소는 fallback 처리를 위해서 상태가 모두 유실된다
fallback 으로 대체되기 때문이다

아래 링크를 통해서 어떤 이야기인지 확인해보자
https://codesandbox.io/s/jovial-sunset-f3dx59?from-embed

잘못된 데이터를 초기화 하는 것은 어찌보면 이상적인 방법일 수 있다
경계를 잘 설정할 경우 어떤 요소들을 같이 재설정해야하는지 이해할 수 있다
루트를 감싸는 것이 아니라 다양한 영역을 다양한 방법으로 감쌀 수 있다

참고 문헌에 적힌 내용
보류 중인 상태를 추적하는 측면에서 이는 도전해야하는 요소이다.
초기 렌더링에서 상태가 보류 중이다.
이는 Suspense 경계를 트리거하게된다
Suspense 경계가 재설정되면 구성 요소가 다시 마운트되고
새 요청을 보내고 경계를 다시 트리거합니다.

따라서 동일한 요청에 대한 지속적인 참조 없이는 이러한 패러다임에서 데이터를 성공적으로 표시하는 것은 불가능하다

구성 요소가 생존하는 것보다 더 오래 유지될 수 있는 캐시가 필요해진다
*/
const Counter = () => {
    // All state will be reset once an error boundary is hit
    const [count, setCount] = useState(0)
    const [error, setError] = useState<null | Error>(null)

    // trigger error boundary
    if (error) throw error

    const increment = () => setCount((n) => n + 1)
    return (
        <div>
            <p>Counter: {count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={() => {
                    // To trigger an error boundary, an error MUST be
                    // thrown during the render cycle.
                    // Throwing an error in an event handler or effect
                    // will not trigger an error boundary!
                    setError(new Error("Whoops something went wrong!"))
                }}
            >Throw Error</button>
        </div>
    )
}
