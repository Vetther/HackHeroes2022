import Link from 'next/link'

const news = ({ news }) => {
  return (
    <div className="columns-xs w-4/5 mx-auto gap-y-8 pt-16">
      {news.articles.map((article, i) => (
        <div key={i} className={`w-full flex flex-col gap-y-2 bg-base-100 p-4 ${i !== 0 ? 'mt-4' : ''} rounded-lg border-base-300 drop-shadow-lg`}>
          <img src={article.urlToImage} alt="" />
          <Link href={article.url}>
            <a className='font-bold hover:text-violet-500/70'>{article.title}</a>
          </Link>
          <p className='text-sm text-base-content/70'>Autor: {article.author}</p>
          <p>{article.description}</p>
          <p className='font-semibold'>{new Date(article.publishedAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch('https://newsapi.org/v2/top-headlines?country=pl&apiKey=866cb1631eee4b0097aaec0b1b63a3f9')
  const news = await res.json()

  return {
    props: { news }
  }
}

export default news