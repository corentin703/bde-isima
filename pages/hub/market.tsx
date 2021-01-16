import { useTheme } from "@material-ui/core"
import Divider from "@material-ui/core/Divider"
import ImageList from "@material-ui/core/ImageList"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import ImageListItem from "@material-ui/core/ImageListItem"
import ImageListItemBar from "@material-ui/core/ImageListItemBar"

import db, { Article } from "db"
import PageTitle from "app/layouts/PageTitle"

type MarketProps = {
  articles: Article[]
}

export default function Market({ articles }: MarketProps) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <>
      <PageTitle title="Classement" />

      <div className="flex flex-col">
        <Typography variant="h4" paragraph align="right">
          Articles disponibles au BDE
        </Typography>

        <Divider className="m-4" />

        <ImageList cols={fullScreen ? 2 : 5} gap={16}>
          {articles.map((article, idx) => (
            <ImageListItem key={idx}>
              <img src={article.image!} alt={article.name} />
              <ImageListItemBar
                position="below"
                title={`${article.name} • ${article.member_price}€`}
                subtitle={`Non-cotisant • ${article.price}€`}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const articles = await db.article.findMany({
    where: { is_enabled: true },
    select: { name: true, image: true, price: true, member_price: true },
  })

  return {
    props: { articles },
    revalidate: 1,
  }
}