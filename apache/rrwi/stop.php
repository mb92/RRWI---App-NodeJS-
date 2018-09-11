<?php 

$gpio_off = shell_exec('gpio -g mode 18 out & gpio -g write 18 0');

echo json_encode(['msg' => "Turn off POWER SUPPLY!"]);

$status = "0";
$file_path = "/home/pi/rrwi/power_status.txt";
$file_handle = fopen($file_path, 'w');
fwrite($file_handle, $status);
fclose($file_handle);

?>
