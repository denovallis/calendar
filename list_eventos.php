<?php require_once 'conexao.php';

$resultado_events = $conn->prepare("SELECT * FROM events");
$resultado_events->execute();
$eventos = [];

while($row_events = $resultado_events->fetch(PDO::FETCH_ASSOC)){
    $eventos[] = $row_events;
}

echo json_encode($eventos);

?>
