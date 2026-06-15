import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "../../lib/api";
import { useUser } from "../../context/UserContext";

const STATUS_COLORS = {
    under_review: "default",
    planned: "info",
    implemented: "success",
    declined: "error",
};

export default function Ideas() {
    const { activeUser } = useUser();
    const queryClient = useQueryClient();

    const {
        data: ideas,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["ideas", activeUser?.id],
        queryFn: () => api.getIdeas(activeUser?.id),
    });

    const voteMutation = useMutation({
        mutationFn: (ideaId) => api.toggleVote(ideaId, activeUser?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ideas", activeUser?.id] });
        },
    });

    if (isPending) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", pt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Typography color="error" sx={{ pt: 4 }}>
                Failed to load ideas.
            </Typography>
        );
    }

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Staff Idea Board
            </Typography>
            <Stack spacing={2}>
                {ideas.map((idea) => (
                    <Card key={idea.id}>
                        <CardContent>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="flex-start"
                            >
                                <Box>
                                    <Typography variant="h6">
                                        {idea.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        {idea.body}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={idea.status_label}
                                    color={
                                        STATUS_COLORS[idea.status] ?? "default"
                                    }
                                    size="small"
                                />
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{ mt: 2 }}
                                alignItems="center"
                            >
                                <Button
                                    size="small"
                                    variant={idea.has_voted ? "contained" : "outlined"}
                                    startIcon={
                                        idea.has_voted ? (
                                            <ThumbUpIcon />
                                        ) : (
                                            <ThumbUpOutlinedIcon />
                                        )
                                    }
                                    onClick={() => voteMutation.mutate(idea.id)}
                                    disabled={!activeUser}
                                >
                                    {idea.vote_count}
                                </Button>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    By {idea.author}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {idea.comment_count} comments
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
                {ideas.length === 0 && (
                    <Typography
                        sx={{
                            color: "text.secondary",
                            textAlign: "center",
                            py: 4,
                        }}
                    >
                        No ideas yet.
                    </Typography>
                )}
            </Stack>
        </Box>
    );
}
