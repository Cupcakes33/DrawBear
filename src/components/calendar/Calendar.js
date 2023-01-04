import styled from "styled-components"

const Calendar = () => {
  return (
    <Container>
      <StHeader>
        <h3>2023년 1월</h3>
        <div className="buttons">
          <div>
            <button>이전 달</button>
            <button>다음 달</button>
          </div>
          <div>
            <button>x</button>
          </div>
        </div>
      </StHeader>
      <StWeek>주</StWeek>
      <StDate>일</StDate>
    </Container>
  )
}

const Container = styled.section`
  width: 500px;
  height: 400px;
  padding: 20px 20px;
  border: 1px solid black;
`

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  .buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`

const StWeek = styled.div`
  width: calc(500px / 7);
  text-align: center;
`

const StDate = styled.div`
  float: left;
  width: calc(500px / 7);
  height: 50px;
  margin-top: 20px;
  text-align: center;
`

export default Calendar