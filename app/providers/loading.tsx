/**
 * Страница загрузки для страницы поставщиков
 * @returns Спинер посередине экрана, сигнализирующий о текущей загрузке
 */
export default function ProviderLoading() {
    
    return (
        <section className="section">
            <div className="container is-size-3">
                <div className="columns is-centered">
                        <span className="loader"></span>
                </div>
            </div>
      </section>
    )
  }