/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import Container from '../components/core/Container'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

const hero = {
  margin: '5rem auto',
  justifyContent: 'center',
  width: '80%'

}
export default function Home () {
  return (
    <>
      <h1 className='title has-text-centered'>Välkommen Till Real Agent Rating</h1>
      <Container customStyle={hero}>
        <div className='tile is-ancestor'>
          <div className='tile is-vertical is-8'>
            <div className='tile'>
              <div className='tile is-parent is-vertical'>
                <article className='tile is-child notification is-primary' style={{ border: '2px solid black' }}>
                  <p className='title'>Vertical...</p>
                  <p className='subtitle'>Top tile</p>
                </article>
                <article className='tile is-child notification is-warning'>
                  <p className='title'>...tiles</p>
                  <p className='subtitle'>Bottom tile</p>
                </article>
              </div>
              <div className='tile is-parent'>
                <article className='tile is-child notification is-info'>
                  <p className='title'>Middle tile</p>
                  <p className='subtitle'>With an image</p>
                  <figure className='image is-4by3'>
                    <img src='https://bulma.io/images/placeholders/640x480.png' />
                  </figure>
                </article>
              </div>
            </div>
            <div className='tile is-parent'>
              <article className='tile is-child notification is-danger'>
                <p className='title'>Wide tile</p>
                <p className='subtitle'>Aligned with the right tile</p>
                <div className='content' />
              </article>
            </div>
          </div>
          <div className='tile is-parent'>
            <article className='tile is-child notification is-success'>
              <div className='content'>
                <p className='title'>Tall tile</p>
                <p className='subtitle'>With even more content</p>
                <div className='content' />
              </div>
            </article>
          </div>
        </div>
      </Container>
    </>
  )
}
Home.getLayout = (page) => <Layout title='Home'>{page}</Layout>
