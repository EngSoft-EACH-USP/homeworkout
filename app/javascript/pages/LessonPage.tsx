import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Link, Typography } from '@material-ui/core'
import Header from '../components/Header'
import api from '../services/api'
import { Lesson } from './LessonList'

type Props = {
  match: {
    params: {
      id: number
    }
  }
}

export default function LessonPage({ match }: Props) {
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const classes = useStyles()

  useEffect(() => {
    listLessons(match).then(setLesson)
  }, [match])

  return (
    <div>
      <Header/>
      <div className={classes.root}>
        <Typography variant='h3' color='textPrimary'>
          {lesson ? lesson.name : 'Aula não encontrada'}
        </Typography>
        {lesson?.link
          ? <iframe width='560' height='315' src={lesson.link} frameBorder='0' allowFullScreen></iframe>
          : 'Aula sem video'
        }

        <Typography variant='body1' color='textPrimary'>{lesson?.description}</Typography>
        <Typography variant='body1' color='textPrimary'>Com prof. {lesson?.teacher?.name}</Typography>
        <Typography variant='body1' color='textPrimary'>Contatos: {lesson?.teacher?.email}</Typography>
        <Link color='primary' href={`https://api.whatsapp.com/send?phone=${lesson?.teacher?.phone}`}>
          Contato por WhatsApp
        </Link>
      </div>
    </div>
  )
}

const listLessons = async match => {
  const { data } = await api.get(`/lessons/${match.params.id}`)
  return data
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      padding: '2rem',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 15,
      margin: '4rem',
    },
    button: {
      marginTop: '0.8rem',
    },
  }),
)
