import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/api";
import { useUser } from "../../context/UserContext";

const STATUS_COLORS = {
    under_review: "default",
    planned: "info",
    implemented: "success",
    declined: "error",
};

export default function IdeaDetail() {
    const { id } = useParams();
    const { activeUser } = useUser();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [commentBody, setCommentBody] = useState("");

    const { data: idea, isPending: ideaLoading } = useQuery({
        queryKey: ["idea", id],
        queryFn: () => api.getIdea(id, activeUser?.id),
    });

    const { data: comments, isPending: commentsLoading } = useQuery({
        queryKey: ["comments", id],
        queryFn: () => api.getComments(id),
    });

    const addCommentMutation = useMutation({
        mutationFn: () => api.addComment(id, commentBody, activeUser?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", id] });
            queryClient.invalidateQueries({ queryKey: ["ideas", activeUser?.id] });
            setCommentBody("");
        },
    });

    if (ideaLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", pt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/")}
                sx={{ mb: 2 }}
            >
                Back to Ideas
            </Button>

            {idea && (
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h5" fontWeight={700} gutterBottom>
                                    {idea.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                    {idea.body}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Posted by {idea.author}
                                </Typography>
                            </Box>
                            <Chip
                                label={idea.status_label}
                                color={STATUS_COLORS[idea.status] ?? "default"}
                            />
                        </Stack>
                    </CardContent>
                </Card>
            )}

            <Typography variant="h6" fontWeight={600} gutterBottom>
                Comments
            </Typography>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="Share your thoughts on this idea..."
                        value={commentBody}
                        onChange={(e) => setCommentBody(e.target.value)}
                        disabled={!activeUser}
                    />
                    <Button
                        sx={{ mt: 1 }}
                        variant="contained"
                        disabled={!commentBody.trim() || !activeUser}
                        onClick={() => addCommentMutation.mutate()}
                    >
                        Post Comment
                    </Button>
                </CardContent>
            </Card>

            {commentsLoading ? (
                <CircularProgress />
            ) : (
                <Stack spacing={2}>
                    {comments?.map((comment) => (
                        <Card key={comment.id}>
                            <CardContent>
                                <Typography variant="body1">
                                    {comment.body}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="caption" color="text.secondary">
                                    {comment.author} · {new Date(comment.created_at).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                    {comments?.length === 0 && (
                        <Typography color="text.secondary" sx={{ py: 2 }}>
                            No comments yet. Be the first to share your thoughts!
                        </Typography>
                    )}
                </Stack>
            )}
        </Box>
    );
}
