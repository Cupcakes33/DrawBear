const Calendar = () => {
  return (
    <section>
      <div>
        <h3>2023년 1월</h3>
        <div>
          <div>
            <button>이전 달</button>
            <button>다음 달</button>
          </div>
          <div>
            <button>x</button>
          </div>
        </div>
      </div>
      <div className="week">주</div>
      <div className="date">일</div>
    </section>
  )
}

export default Calendar