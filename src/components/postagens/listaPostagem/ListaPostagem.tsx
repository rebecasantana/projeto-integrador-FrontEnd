import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import Postagem from '../../../models/Postagem'
import { busca } from '../../../service/Service'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TokenState } from '../../../store/tokens/TokensReducer'
import { toast } from 'react-toastify'
import { Grid } from '@material-ui/core';

function ListaPostagem() {

    const token = useSelector<TokenState, TokenState["token"]>(
        (state) => state.token
    )

    const [postagens, setPostagens] = useState<Postagem[]>([]);

    const history = useNavigate();

    useEffect(() => {
        if (token === '') {
            toast.error('Você precisa estar logado!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined
            })
            history('/login');
        }
    }, [token]);

    async function getAllPostagens() {
        await busca('/postagens', setPostagens, {
            headers: {
                Authorization: token
            }
        })
    }

    useEffect(() => {
        getAllPostagens();
    }, [postagens.length]);

    return (
        <div className='listaPost'>

          <div >

            {postagens.map((post) => (
                <Box m={4}  alignItems="center" justifyContent="center">
                    <Card variant='outlined'  style={{ padding: '8px', backgroundColor: ' #c6ffff41', width:'500px'}}>
                        <CardContent>
                            <Typography variant="h5" color="green" gutterBottom>
                                {post.titulo}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {post.texto}
                            </Typography>
                            
                            <Typography variant="body1" component="p">
                                Postado por: {post.usuario?.nome}
                            </Typography>
                            <Typography className='imagempost'>
                            {/* <img src={post.usuario?.foto} alt={post.usuario?.nome} /> */}
                            <img src={post.imagem} alt={post.usuario?.nome} width={450} />
                            </Typography>
                            <Typography variant="body1"  component="p">
                                Tema: {post.tema?.categoria}
                            </Typography>
                            <Typography variant="body1" component="p">
                                {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat */}
                                Data: {Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'medium' }).format(new Date(post.data))}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to={`/editarPostagem/${post.id}`}>
                                <Button color="primary" variant="contained" size="small" fullWidth>
                                    Editar
                                </Button>
                            </Link>
                            <Link to={`/apagarPostagem/${post.id}`}>
                                <Button color="error" variant="contained" size="small" fullWidth>
                                    Deletar
                                </Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Box>
            ))}
            </div>
            <div >

            </div>
        </div>
    );
}

export default ListaPostagem