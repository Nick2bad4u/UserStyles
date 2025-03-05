#f45873b3-b655-43a6-b217-97c00aa0db58 PowerToys CommandNotFound module

Import-Module -Name Microsoft.WinGet.CommandNotFound
#f45873b3-b655-43a6-b217-97c00aa0db58

# Alias section
New-Alias boottime BootDate
New-Alias upsince BootDate
New-Alias starttime BootDate
New-Alias initdate BootDate
New-Alias poweron BootDate
New-Alias startup BootDate
New-Alias bootup BootDate
New-Alias systemstart BootDate
New-Alias poweruptime BootDate

New-Alias fixwindows Repair-All
New-Alias repairwindows Repair-All
New-Alias unfuckwindows Repair-All
New-Alias repairall Repair-All
New-Alias dismrestore Repair-All
New-Alias dismfix Repair-All

New-Alias wingetupdateall WingetUpdate
New-Alias wgu WingetUpdate

New-Alias beautifyps Edit-DTWBeautifyScript
New-Alias psbeautify Edit-DTWBeautifyScript
New-Alias powershellbeautify Edit-DTWBeautifyScript
New-Alias fixpowershellscript Edit-DTWBeautifyScript
New-Alias fixpowershellformatting Edit-DTWBeautifyScript
New-Alias fixpowershell Edit-DTWBeautifyScript
New-Alias PSBeauty Edit-DTWBeautifyScript
New-Alias beautifyscript Edit-DTWBeautifyScript
New-Alias formatpowershell Edit-DTWBeautifyScript
New-Alias formatps Edit-DTWBeautifyScript
New-Alias formatpsscript Edit-DTWBeautifyScript
New-Alias beautifypsscript Edit-DTWBeautifyScript
New-Alias psformat Edit-DTWBeautifyScript
New-Alias beautifyformat Edit-DTWBeautifyScript
New-Alias beautifycode Edit-DTWBeautifyScript
New-Alias psbeautifycode Edit-DTWBeautifyScript
New-Alias beautifyformatps Edit-DTWBeautifyScript

New-Alias prettynow pretty
New-Alias runpretty pretty
New-Alias runprettynow pretty
New-Alias prettyfiles pretty
New-Alias makepretty pretty
New-Alias beautifyfiles pretty
New-Alias prettifyfiles pretty
New-Alias makeitpretty pretty
New-Alias prettyrun pretty
New-Alias prettifyrun pretty
New-Alias beautifyrun pretty
New-Alias prettyrunfiles pretty

New-Alias notepadprofile editprofile
New-Alias editpsprofile editprofile
New-Alias editpowershellprofile editprofile
New-Alias psprofileedit editprofile
New-Alias profileedit editprofile
New-Alias profileeditor editprofile
New-Alias editprofileps editprofile
New-Alias editprofilepowershell editprofile
New-Alias profilepsedit editprofile
New-Alias profilepowershelledit editprofile
New-Alias openprofile editprofile
New-Alias editpsprofilefile editprofile
New-Alias editpowershellprofilefile editprofile
New-Alias editprofilefile editprofile

# Functions in profile:
# Remove-Images: Deletes all image files (JPG, PNG, GIF, BMP) in a specified directory.
# Clear-Temp: Clears the temporary files in $env:TEMP.
# Get-LastRun: Retrieves the last logged run of a script from a specified log file.
# Get-IPAddress: Fetches the public IP using an external API.
# Get-DiskUsage: Displays disk usage for a specified drive.
# Restart-Service: Restarts a specified Windows service.
# Show-FileSize: Shows the size of a specified file in MB.
# Convert-Size: Converts bytes to a readable format (KB, MB, GB).
# Find-ProcessByName: Lists processes that match a specified name.
# Start-Task: Starts a new task or application by command.
# Get-ProcessInfo: Lists all processes with CPU and memory information.
# Clear-EventLogs: Clears all Windows event logs.
# Get-ComputerInfo: Displays basic computer information like manufacturer, model, RAM, and OS.
# Find-LargestFiles: Finds the largest files in a specified path.
# Get-UserAccount: Retrieves a list of local user accounts.
# Export-ProcessList: Exports the list of processes to a CSV file.
# Check-ServiceStatus: Checks the status of a specified service.
# Start-ProcessAsAdmin: Runs a specified process with administrator privileges.
# Get-FileHash: Calculates the hash of a specified file.
# Schedule-Task: Creates a scheduled task with a specified time trigger.
# Get-InstalledSoftware: Lists installed software.
# Get-NetworkInfo: Displays information about network adapters.
# Show-DiskSpace: Shows disk space usage per drive.
# Kill-ProcessByName: Terminates a process by name.
# Convert-ToHtml: Creates an HTML report of files in a directory.
# Get-SystemUptime: Displays system uptime in days, hours, and minutes.
# Test-Port: Checks if a specified port is open on a host.
# Get-ProcessCPUUsage: Lists CPU usage for a specified process by name.
# Export-EventLogs: Exports specified Windows event logs to a file.
# Send-Email: Sends an email via an SMTP server.
# Repair-All: Performs a series of DISM and SFC scans to check and repair system health.
# BootDate: Retrieves the system's last boot time.
# WingetUpdate: Updates all packages using winget, including unknown ones, and displays a success message.
# pretty: Runs Prettier on all files in the current directory to format code and outputs a completion message.
# Clear-Clipboard: Clears the clipboard content.
# Get-RegistryValue: Retrieves a specified registry value and shows it if found.
# Show-DirectorySize: Calculates and displays the total size of a specified directory in MB.
# Get-Services: Lists all services on the system, showing their display names and statuses.
# Get-SystemInfo: Retrieves system information, including computer name, OS architecture, Windows version, and build.
# Get-EnvironmentVariables: Displays all environment variables with their names and values.
# Backup-Files: Copies files from a source directory to a specified destination directory for backup.
# Get-InstalledSoftware: Retrieves a list of installed software, displaying names and versions.
# Schedule-Task: Schedules a task to run a command at a specified time with system privileges.
# Get-FileHash: Computes and displays the hash of a specified file if it exists.
# editprofile: Opens the PowerShell profile in Notepad++ for editing.
# notepad++: Opens Notepad++.

function ghcs {
        # Debug support provided by common PowerShell function parameters, which is natively aliased as -d or -db
        # https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_commonparameters?view=powershell-7.4#-debug
        param(
                [Parameter()]
                [string]$Hostname,

                [ValidateSet('gh', 'git', 'shell')]
                [Alias('t')]
                [String]$Target = 'shell',

                [Parameter(Position=0, ValueFromRemainingArguments)]
                [string]$Prompt
        )
        begin {
                # Create temporary file to store potential command user wants to execute when exiting
                $executeCommandFile = New-TemporaryFile

                # Store original value of GH_* environment variable
                $envGhDebug = $Env:GH_DEBUG
                $envGhHost = $Env:GH_HOST
        }
        process {
                if ($PSBoundParameters['Debug']) {
                        $Env:GH_DEBUG = 'api'
                }

                $Env:GH_HOST = $Hostname

                gh copilot suggest -t $Target -s "$executeCommandFile" $Prompt
        }
        end {
                # Execute command contained within temporary file if it is not empty
                if ($executeCommandFile.Length -gt 0) {
                        # Extract command to execute from temporary file
                        $executeCommand = (Get-Content -Path $executeCommandFile -Raw).Trim()

                        # Insert command into PowerShell up/down arrow key history
                        [Microsoft.PowerShell.PSConsoleReadLine]::AddToHistory($executeCommand)

                        # Insert command into PowerShell history
                        $now = Get-Date
                        $executeCommandHistoryItem = [PSCustomObject]@{
                                CommandLine = $executeCommand
                                ExecutionStatus = [Management.Automation.Runspaces.PipelineState]::NotStarted
                                StartExecutionTime = $now
                                EndExecutionTime = $now.AddSeconds(1)
                        }
                        Add-History -InputObject $executeCommandHistoryItem

                        # Execute command
                        Write-Host "`n"
                        Invoke-Expression $executeCommand
                }
        }
        clean {
                # Clean up temporary file used to store potential command user wants to execute when exiting
                Remove-Item -Path $executeCommandFile

                # Restore GH_* environment variables to their original value
                $Env:GH_DEBUG = $envGhDebug
        }
}

function ghce {
        # Debug support provided by common PowerShell function parameters, which is natively aliased as -d or -db
        # https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_commonparameters?view=powershell-7.4#-debug
        param(
                [Parameter()]
                [string]$Hostname,

                [Parameter(Position=0, ValueFromRemainingArguments)]
                [string[]]$Prompt
        )
        begin {
                # Store original value of GH_* environment variables
                $envGhDebug = $Env:GH_DEBUG
                $envGhHost = $Env:GH_HOST
        }
        process {
                if ($PSBoundParameters['Debug']) {
                        $Env:GH_DEBUG = 'api'
                }

                $Env:GH_HOST = $Hostname

                gh copilot explain $Prompt
        }
        clean {
                # Restore GH_* environment variables to their original value
                $Env:GH_DEBUG = $envGhDebug
                $Env:GH_HOST = $envGhHost
        }
}


function Remove-Images {
	param(
		[string]$Path = (Get-Location) # Default to current directory if no path is provided
	)

	Write-Host "Removing images from path: $Path" -ForegroundColor Yellow

	# Ensure the path exists
	if (-not (Test-Path $Path)) {
		Write-Host "The specified path does not exist: $Path" -ForegroundColor Red
		return
	}

	# Remove image files recursively from the specified path
	Write-Host 'Searching for image files to remove...' -ForegroundColor Yellow
	Get-ChildItem -Path $Path -Recurse -File -Include *.jpg, *.jpeg, *.png, *.gif, *.bmp | Remove-Item -Force
	Write-Host 'Image files removed.' -ForegroundColor Green
}

function Clear-Temp {
	param(
		[switch]$Force
	)

	$tempPath = "$env:TEMP\*"
	Write-Host "Clearing temporary files from: $env:TEMP" -ForegroundColor Yellow

	# Prompt for confirmation if -Force is not specified
	if (-not $Force) {
		$confirmation = Read-Host "Are you sure you want to delete all files in $env:TEMP? (y/n)"
		if ($confirmation -ne 'y') {
			Write-Host 'Operation cancelled by user.' -ForegroundColor Cyan
			return
		}
	}

	try {
		Remove-Item -Path $tempPath -Recurse -Force -ErrorAction Stop
		Write-Host "Temporary files cleared from $env:TEMP." -ForegroundColor Green
	}
	catch {
		Write-Host "An error occurred while clearing temporary files: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# Clear-Temp
# Clear-Temp -Force

function Get-LastRun {
	param(
		[Parameter(Mandatory = $true)]
		[string]$ScriptName,

		[string]$LogFilePath
	)

	# Prompt for log file location if not provided
	if (-not $LogFilePath) {
		$LogFilePath = Read-Host 'Enter log file location'
	}

	# Check if the log file exists
	if (-not (Test-Path $LogFilePath)) {
		Write-Host "Log file not found: $LogFilePath" -ForegroundColor Red
		return
	}

	Write-Host "Retrieving last run information for script: $ScriptName from log file: $LogFilePath" -ForegroundColor Yellow

	try {
		# Retrieve the last run information
		$lastRunInfo = Get-Content $LogFilePath | Select-String $ScriptName | Select-Object -Last 1

		if ($lastRunInfo) {
			Write-Host "Last run information: $lastRunInfo" -ForegroundColor Green
		}
		else {
			Write-Host "No run information found for script: $ScriptName" -ForegroundColor Red
		}
	}
	catch {
		Write-Host "An error occurred while retrieving the last run information: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# Get-LastRun -ScriptName 'MyScript.ps1' -LogFilePath 'C:\Path\To\Your\LogFile.log'

<#
.SYNOPSIS
Retrieves the public IP address using an external API.

.DESCRIPTION
The Get-IPAddress function fetches the public IP address of the system by making a request to an external API.

.EXAMPLE
Get-IPAddress
Displays the public IP address of the system.

.NOTES
If the API request fails, an error message is displayed.
#>
function Get-IPAddress {
	Write-Host 'Retrieving public IP address...' -ForegroundColor Yellow
	try {
		$ip = $null
		$ip = Invoke-RestMethod -Uri 'https://api.ipify.org'
		Write-Host "Your public IP address is: $ip" -ForegroundColor Cyan
	}
	catch {
		Write-Host 'Network error occurred while retrieving IP address.' -ForegroundColor Red
	}
}

function Get-DiskUsage {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory = $false)]
		[ValidatePattern('^[A-Za-z]:$')]
		[string]$Drive = 'C:'
	)

	try {
		$driveInfo = Get-PSDrive -Name $Drive -ErrorAction Stop
	}
	catch {
		Write-Error "Drive $Drive does not exist or usage information could not be retrieved."
		return
	}

	if (-not $driveInfo) {
		Write-Error "No usage information available for drive $Drive."
		return
	}

	$usedGB = [math]::Round($driveInfo.Used / 1GB, 2)
	$sizeGB = [math]::Round($driveInfo.Size / 1GB, 2)
	Write-Host "$Drive Drive Usage: $usedGB GB used out of $sizeGB GB." -ForegroundColor Green
}

function Restart-Service {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory = $true)]
		[string]$ServiceName
	)

	Write-Verbose "Attempting to restart service: $ServiceName"
	try {
		# Retrieve the service to verify it exists.
		$service = Get-Service -Name $ServiceName -ErrorAction Stop

		# Inform if the service is not running before attempting to start or restart.
		if ($service.Status -ne 'Running') {
			Write-Host "Service '$ServiceName' is not running. Attempting to start it..." -ForegroundColor Yellow
		}
		else {
			Write-Host "Restarting service: $ServiceName" -ForegroundColor Yellow
		}

		# Use the fully qualified cmdlet name to avoid recursive function call.
		Microsoft.PowerShell.Management\Restart-Service -Name $ServiceName -Force -ErrorAction Stop

		Write-Host "Service '$ServiceName' restarted successfully." -ForegroundColor Green
	}
	catch {
		Write-Host "Failed to restart service '$ServiceName'. Error: $_" -ForegroundColor Red
	}
}

function Show-FileSize {
	param(
		[string]$FilePath
	)

	Write-Host "Checking file size for: $FilePath" -ForegroundColor Yellow
	if (Test-Path $FilePath) {
		$size = (Get-Item $FilePath).Length
		$sizeMB = [math]::Round($size / 1MB, 2)
		Write-Host ('Size of {0}: {1} MB' -f $FilePath, $sizeMB) -ForegroundColor Cyan
	}
	else {
		Write-Host ('File not found: {0}' -f $FilePath) -ForegroundColor Red
	}
}

function Convert-Size {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory = $true)]
		[long]$Bytes
	)

	# Determine the proper unit and format accordingly.
	if ($Bytes -lt 1KB) {
		return "$Bytes Bytes"
	}
	elseif ($Bytes -lt 1MB) {
		return '{0:N2} KB' -f ($Bytes / 1KB)
	}
	elseif ($Bytes -lt 1GB) {
		return '{0:N2} MB' -f ($Bytes / 1MB)
	}
	else {
		return '{0:N2} GB' -f ($Bytes / 1GB)
	}
}

function Find-ProcessByName {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory = $true, ValueFromPipeline = $true)]
		[string]$ProcessName
	)
	Write-Host "Finding processes by name: $ProcessName" -ForegroundColor Yellow

	try {
		$processes = Get-Process -Name $ProcessName -ErrorAction Stop

		if ($processes) {
			$processes | Format-Table -AutoSize `
				Id,
			Name,
			@{Label = 'Path'; Expression = {
					try { $_.Path }    catch { 'N/A' }
				}
			}
		}
	}
	catch {
		Write-Host "No process found with name: $ProcessName" -ForegroundColor Red
	}
}

function Start-Task {
	param(
		[string]$Command
	)
	Write-Host "Starting task: $Command" -ForegroundColor Yellow
	Start-Process -FilePath $Command
	Write-Host "Started task: $Command" -ForegroundColor Green
}

function Get-ProcessInfo {
	[CmdletBinding()]
	param(
		# Optional parameter to filter processes by name(s)
		[string[]]$ProcessName
	)

	Write-Host 'Retrieving process information...' -ForegroundColor Yellow

	# Retrieve processes, optionally filtered by provided process names
	$processes = if ($ProcessName) {
		Get-Process -Name $ProcessName -ErrorAction SilentlyContinue
	}
	else {
		Get-Process
	}

	if ($null -eq $processes) {
		Write-Host 'No matching processes found.' -ForegroundColor Red
		return
	}

	# Select and format process information, handling potential null CPU value
	$processes |
		Select-Object Name,
		Id,
		@{ Name = 'CPU (s)'; Expression = {
				if ($_.CPU) { [math]::Round([double]$_.CPU, 2) }
				else { 'N/A' }
			}
		},
		@{ Name = 'Memory (MB)'; Expression = { [math]::Round($_.WorkingSet64 / 1MB, 2) } } |
		Format-Table -AutoSize
}

function Clear-EventLogs {
	try {
		Write-Verbose 'Starting to clear all event logs...'
		Get-EventLog -List | ForEach-Object {
			Write-Verbose "Clearing event log: $($_.Log)"
			Clear-EventLog -LogName $_.Log -ErrorAction Stop
		}
		Write-Output 'All event logs have been cleared.'
	}
	catch {
		Write-Error "Failed to clear event logs. Error: $_"
	}
}

function Get-ComputerInfo {
	try {
		Write-Verbose 'Retrieving computer information...'
		$cs = Get-CimInstance -ClassName Win32_ComputerSystem -ErrorAction Stop
		$os = Get-CimInstance -ClassName Win32_OperatingSystem -ErrorAction Stop

		[pscustomobject]@{
			Manufacturer = $cs.Manufacturer
			Model        = $cs.Model
			'RAM (GB)'   = [math]::Round($cs.TotalPhysicalMemory / 1GB, 2)
			OS           = $os.Caption
		}
	}
	catch {
		Write-Error "Error retrieving computer info: $_"
	}
}

function Find-LargestFiles {
	param(
		[Parameter(Mandatory = $true)]
		[string]$Path,
		[int]$Count = 10
	)
	if (-not (Test-Path $Path)) {
		Write-Error "The specified path does not exist: $Path"
		return
	}
	try {
		Write-Verbose "Finding top $Count largest files in path: $Path"
		Get-ChildItem -Path $Path -Recurse -File -ErrorAction Stop |
			Sort-Object -Property Length -Descending |
			Select-Object -First $Count |
			Format-Table Name, @{ Name = 'Size (MB)'; Expression = { [math]::Round($_.Length / 1MB, 2) } } -AutoSize
	}
	catch {
		Write-Error "Error finding largest files: $_"
	}
}

function Get-UserAccount {
	try {
		Write-Verbose 'Retrieving user account information...'
		Get-LocalUser -ErrorAction Stop |
			Select-Object Name, Enabled, LastLogon |
			Format-Table -AutoSize
	}
	catch {
		Write-Error "Failed to retrieve local user accounts: $_"
	}
}

function Export-ProcessList {
	param(
		[string]$FilePath = 'C:\Path\To\Your\Processes.csv'
	)

	Write-Host "Exporting process list to: $FilePath" -ForegroundColor Yellow
	Get-Process | Export-Csv -Path $FilePath -NoTypeInformation
	Write-Host "Process list exported to $FilePath" -ForegroundColor Green
}

function Get-ServiceStatus {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory = $true)]
		[string]$ServiceName
	)

	Write-Verbose "Retrieving status for service: $ServiceName"
	try {
		$service = Get-Service -Name $ServiceName -ErrorAction Stop
		Write-Host "Service: $($service.Name) is currently $($service.Status)." -ForegroundColor Cyan

		# Return a custom object with the service's details
		[pscustomobject]@{
			Name   = $service.Name
			Status = $service.Status
		}
	}
	catch {
		Write-Host "Error: Service '$ServiceName' not found or cannot be queried." -ForegroundColor Red
	}
}

function Start-ProcessAsAdmin {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory = $true)]
		[string]$FilePath
	)

	if (-not (Test-Path $FilePath)) {
		Write-Host "Error: File path '$FilePath' does not exist." -ForegroundColor Red
		return
	}

	Write-Host "Starting '$FilePath' as administrator..." -ForegroundColor Yellow

	try {
		Start-Process -FilePath $FilePath -Verb RunAs -ErrorAction Stop
		Write-Host "Successfully started '$FilePath' as administrator." -ForegroundColor Green
	}
	catch {
		Write-Host "Failed to start '$FilePath' as administrator. Error: $_" -ForegroundColor Red
	}
}

function Get-FileHash {
	param(
		[string]$FilePath
	)

	Write-Host "Calculating file hash for: $FilePath" -ForegroundColor Yellow
	if (Test-Path $FilePath) {
		Get-FileHash -Path $FilePath | Format-Table Algorithm, Hash
	}
	else {
		Write-Host "File not found: $FilePath" -ForegroundColor Red
	}
}

function Register-Task {
	param(
		[string]$TaskName,
		[string]$Command,
		[string]$TriggerTime
	)

	Write-Host "Scheduling task '$TaskName' to run '$Command' at $TriggerTime" -ForegroundColor Yellow
	$action = New-ScheduledTaskAction -Execute $Command
	$trigger = New-ScheduledTaskTrigger -At $TriggerTime
	Register-ScheduledTask -Action $action -Trigger $trigger -TaskName $TaskName -User 'SYSTEM' -RunLevel Highest
	Write-Host "Scheduled task '$TaskName' created to run '$Command' at $TriggerTime." -ForegroundColor Green
}

function Get-InstalledSoftware {
	Write-Host 'Retrieving installed software list...' -ForegroundColor Yellow
	Get-WmiObject -Class Win32_Product | Select-Object Name, Version, InstallDate | Format-Table -AutoSize
}

function Get-NetworkInfo {
	Get-NetAdapter | Select-Object Name, Status, MacAddress, LinkSpeed | Format-Table -AutoSize
}

function Show-DiskSpace {
	Get-PSDrive -PSProvider FileSystem | Select-Object Name, @{ Name = 'Used (GB)'; Expression = { [math]::Round($_.Used / 1GB, 2) } }, @{ Name = 'Free (GB)'; Expression = { [math]::Round($_.Free / 1GB, 2) } }, @{ Name = 'Total (GB)'; Expression = { [math]::Round($_.Used / 1GB + $_.Free / 1GB, 2) } } | Format-Table -AutoSize
}

<#
.SYNOPSIS
Stops a process by its name.

.DESCRIPTION
The Stop-ProcessByName function stops a process by its name. It takes a process name as input and attempts to stop the process. If the process is not found, it writes a verbose message indicating that no process was found with the specified name.

.PARAMETER ProcessName
The name of the process to stop. This parameter is mandatory and accepts input from the pipeline.

.EXAMPLE
Stop-ProcessByName -ProcessName "notepad"
Stops the process named "notepad".

.EXAMPLE
"notepad" | Stop-ProcessByName
Stops the process named "notepad" using pipeline input.

.NOTES
If the process cannot be stopped, an error message is displayed in red.

#>
function Stop-ProcessByName {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory = $true, ValueFromPipeline = $true)]
		[string]$ProcessName
	)
	process {
		# Ensure the ProcessName is not empty or null
		if (![string]::IsNullOrWhiteSpace($ProcessName)) {
			try {
				$process = Get-Process -Name $ProcessName -ErrorAction SilentlyContinue
				if ($process) {
					$process | Stop-Process -Force
					Write-Verbose "Stopped process: $ProcessName" -Verbose
				}
				else {
					Write-Verbose "No process found with name: $ProcessName" -Verbose
				}
			}
			catch {
				Write-Host "Error occurred while stopping the process: $ProcessName" -ForegroundColor Red
			}
		}
		else {
			Write-Host 'Invalid process name provided.' -ForegroundColor Red
		}
	}
}


function Convert-ToHtml {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory = $true)]
		[string]$Path,
		[string]$OutputFile = 'FileList.html'
	)

	# Check if the specified path exists
	if (-not (Test-Path $Path)) {
		Write-Verbose "Path not found: $Path" -Verbose
		return
	}

	try {
		# Retrieve only files from the specified path
		$files = Get-ChildItem -Path $Path -File -ErrorAction Stop

		# Check if there are any files in the specified path
		if (-not $files) {
			Write-Verbose "No files found in the path: $Path" -Verbose
			return
		}

		# Convert the file list to HTML format with a heading
		$html = $files | ConvertTo-Html -Property Name, Length, LastWriteTime `
			-Title 'File List' -PreContent "<h1>File List for $Path</h1>"

		# Save the HTML content to the specified output file using UTF8 encoding
		$html | Out-File -FilePath $OutputFile -Encoding UTF8

		Write-Verbose "HTML report created: $OutputFile" -Verbose
	}
	catch {
		Write-Verbose 'Error: Unable to retrieve files from the specified path. Please check the path and permissions.' -Verbose
	}
}


<#
.SYNOPSIS
Retrieves and displays the system uptime.

.DESCRIPTION
The Get-SystemUptime function calculates and displays the system uptime by retrieving the last boot time and calculating the duration from the boot time to the current time.

.EXAMPLE
Get-SystemUptime
Displays the system uptime in days, hours, and minutes.

.NOTES
If an error occurs while retrieving the system uptime, an error message is displayed.
#>
function Get-SystemUptime {
	[CmdletBinding()]
	param()

	try {
		# Retrieve the last boot time
		$bootTime = (Get-CimInstance -Class Win32_OperatingSystem).LastBootUpTime

		# Calculate the uptime duration
		$uptimeDuration = New-TimeSpan -Start $bootTime -End (Get-Date)

		# Display the uptime duration
		Write-Verbose "System uptime: $($uptimeDuration.Days) days, $($uptimeDuration.Hours) hours, $($uptimeDuration.Minutes) minutes."

		# Output the uptime duration
		return $uptimeDuration
	}
	catch {
		Write-Verbose 'Error: Unable to retrieve system uptime.'
	}
}

# Example usage:
# Get-SystemUptime -Verbose


function Test-PortOld {
	param(
		[string]$TargetHost,
		[int]$Port
	)

	$tcpConnection = Test-NetConnection -ComputerName $Host -Port $Port
	if ($tcpConnection.TcpTestSucceeded) {
		Write-Host "Port $Port on $Host is open." -ForegroundColor Green
	}
	else {
		Write-Host "Port $Port on $Host is closed." -ForegroundColor Red
	}
}

function Get-ProcessCPUUsage {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory = $true)]
		[string]$ProcessName
	)

	try {
		# Get all processes and perform a fuzzy search for the process name
		$processes = Get-Process -Name $ProcessName -ErrorAction Stop | Where-Object { $_.Name -like "*$ProcessName*" }

		if ($processes) {
			foreach ($process in $processes) {
				$cpuUsage = $process | Measure-Object -Property CPU -Sum
				Write-Verbose "CPU Usage for $($process.Name): $($cpuUsage.Sum) seconds" -Verbose
			}
		}
		else {
			Write-Verbose "Process not found: $ProcessName" -Verbose
		}
	}
	catch {
		Write-Verbose "Error occurred while retrieving CPU usage for process: $ProcessName" -Verbose
	}
}


function Export-EventLogs {
	param(
		[Parameter(Mandatory = $true)]
		[string]$LogName,

		[Parameter(Mandatory = $true)]
		[string]$FilePath
	)

	try {
		# Validate the log name
		if (-not (Get-WinEvent -ListLog $LogName -ErrorAction SilentlyContinue)) {
			Write-Host "Invalid log name: $LogName" -ForegroundColor Red
			return
		}

		# Export the event logs
		Write-Host "Exporting $LogName logs to $FilePath..." -ForegroundColor Yellow
		wevtutil.exe export-log $LogName $FilePath /format:evtx

		if ($?) {
			Write-Host "Exported $LogName logs to $FilePath successfully." -ForegroundColor Green
		}
		else {
			Write-Host "Failed to export $LogName logs to $FilePath." -ForegroundColor Red
		}
	}
	catch {
		Write-Host "An error occurred while exporting the logs: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# Export-EventLogs -LogName 'Application' -FilePath 'C:\Path\To\Your\EventLogs.evtx'

# Example usage:
# Export-EventLogs -LogName 'Application' -FilePath 'C:\Path\To\Your\EventLogs.evtx'

function Send-Email {
	param(
		[Parameter(Mandatory = $true)]
		[string]$To,

		[Parameter(Mandatory = $true)]
		[string]$Subject,

		[Parameter(Mandatory = $true)]
		[string]$Body,

		[Parameter(Mandatory = $true)]
		[string]$SmtpServer,

		[Parameter(Mandatory = $true)]
		[string]$From,

		[Parameter(Mandatory = $true)]
		[System.Management.Automation.PSCredential]$Credential
	)

	try {
		$message = New-Object System.Net.Mail.MailMessage
		$message.From = $From
		$message.To.Add($To)
		$message.Subject = $Subject
		$message.Body = $Body

		$smtp = New-Object Net.Mail.SmtpClient($SmtpServer)
		$smtp.Credentials = $Credential.GetNetworkCredential()
		$smtp.EnableSsl = $true

		$smtp.Send($message)
		Write-Host "Email sent to $To" -ForegroundColor Green
	}
	catch {
		Write-Host "An error occurred while sending the email: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# $SecurePassword = Read-Host -AsSecureString 'Enter your password'
# $Credential = New-Object System.Management.Automation.PSCredential ('yourUsername', $SecurePassword)
# Send-Email -To 'recipient@example.com' -Subject 'Test Email' -Body 'This is a test email.' -SmtpServer 'smtp.yourserver.com' -From 'you@yourdomain.com' -Credential $Credential
function Repair-All {
	try {
		Write-Host 'Starting the system repair process...' -ForegroundColor Yellow

		# Run the DISM commands to check, scan, and restore the health of the image
		Write-Host 'Checking health of the image...' -ForegroundColor Yellow
		DISM /Online /Cleanup-Image /CheckHealth
		Write-Host 'Health check completed.' -ForegroundColor Green

		Write-Host 'Scanning the health of the image...' -ForegroundColor Yellow
		DISM /Online /Cleanup-Image /ScanHealth
		Write-Host 'Health scan completed.' -ForegroundColor Green

		Write-Host 'Restoring the health of the image...' -ForegroundColor Yellow
		DISM /Online /Cleanup-Image /RestoreHealth
		Write-Host 'Health restoration completed.' -ForegroundColor Green

		Write-Host 'Running System File Checker (SFC)...' -ForegroundColor Yellow
		sfc /scannow
		Write-Host 'SFC scan completed.' -ForegroundColor Green

		# Repeat the process to ensure thoroughness
		Write-Host 'Repeating the health check...' -ForegroundColor Yellow
		DISM /Online /Cleanup-Image /CheckHealth
		Write-Host 'Health check repeated.' -ForegroundColor Green

		Write-Host 'Scanning the health of the image again...' -ForegroundColor Yellow
		DISM /Online /Cleanup-Image /ScanHealth
		Write-Host 'Health scan repeated.' -ForegroundColor Green

		Write-Host 'Restoring the health of the image again...' -ForegroundColor Yellow
		DISM /Online /Cleanup-Image /RestoreHealth
		Write-Host 'Health restoration repeated.' -ForegroundColor Green

		Write-Host 'Running System File Checker (SFC) again...' -ForegroundColor Yellow
		sfc /scannow
		Write-Host 'SFC scan repeated.' -ForegroundColor Green

		# Final health checks
		Write-Host 'Final health check...' -ForegroundColor Yellow
		DISM /Online /Cleanup-Image /CheckHealth
		Write-Host 'Final health check completed.' -ForegroundColor Green

		Write-Host 'Final scan for health...' -ForegroundColor Yellow
		DISM /Online /Cleanup-Image /ScanHealth
		Write-Host 'Final health scan completed.' -ForegroundColor Green

		Write-Host 'Final restoration of health...' -ForegroundColor Yellow
		DISM /Online /Cleanup-Image /RestoreHealth
		Write-Host 'Final health restoration completed.' -ForegroundColor Green

		Write-Host 'Final System File Checker (SFC) run...' -ForegroundColor Yellow
		sfc /scannow
		Write-Host 'Final SFC scan completed.' -ForegroundColor Green

		Write-Host 'System repair process completed successfully.' -ForegroundColor Green
	}
	catch {
		Write-Host "An error occurred: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# Repair-All

# Function to display the system boot time
function BootDate {
	try {
		Write-Host 'Retrieving system boot time...' -ForegroundColor Yellow

		# Check if the command 'systeminfo' is available
		if (Get-Command systeminfo -ErrorAction SilentlyContinue) {
			# Use systeminfo to get boot time
			$bootTime = systeminfo | Select-String 'System Boot Time'
		}
		else {
			# Use CIM cmdlets as a fallback (works on Windows systems)
			$os = Get-CimInstance -ClassName Win32_OperatingSystem
			$bootTime = $os.LastBootUpTime
		}

		if ($bootTime) {
			Write-Host "System boot time: $bootTime" -ForegroundColor Cyan
		}
		else {
			Write-Host 'System boot time could not be retrieved.' -ForegroundColor Red
		}

		Write-Host 'System boot time retrieved.' -ForegroundColor Green
	}
	catch {
		Write-Host "An error occurred while retrieving the system boot time: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# BootDate
# Function to update packages using winget, including unknown packages
function WingetUpdate {
	try {
		Write-Host 'Updating packages using winget, including unknown packages...' -ForegroundColor Yellow

		# Check if winget is installed
		if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
			Write-Host 'winget is not installed. Please install winget first.' -ForegroundColor Red
			return
		}

		# Run winget update
		winget update --include-unknown

		Write-Host 'Packages updated successfully.' -ForegroundColor Green
	}
	catch {
		Write-Host "An error occurred while updating packages: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# WingetUpdate

# Function to run prettier on all files in the current directory
function pretty {
	try {
		Write-Host 'Running Prettier on all files in the current directory.' -ForegroundColor Yellow

		# Check if Prettier is installed
		if (-not (Get-Command prettier -ErrorAction SilentlyContinue)) {
			Write-Host 'Prettier is not installed. Please install Prettier first.' -ForegroundColor Red
			return
		}

		# Run Prettier
		prettier --write .

		Write-Host 'Finished running Prettier on all files.' -ForegroundColor Green
	}
	catch {
		Write-Host "An error occurred while running Prettier: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# pretty
# Function to clear the clipboard
function Clear-Clipboard {
	try {
		Write-Host 'Clearing clipboard...' -ForegroundColor Yellow

		# Clear the clipboard
		Set-Clipboard -Value $null

		Write-Host 'Clipboard cleared.' -ForegroundColor Green
	}
	catch {
		Write-Host "An error occurred while clearing the clipboard: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# Clear-Clipboard

# Function to retrieve a registry value
function Get-RegistryValue {
	param(
		[Parameter(Mandatory = $true)]
		[string]$Path,

		[Parameter(Mandatory = $true)]
		[string]$Name
	)

	try {
		Write-Host "Retrieving registry value from path: $Path, name: $Name" -ForegroundColor Yellow

		# Retrieve the registry value
		$value = Get-ItemProperty -Path $Path -Name $Name -ErrorAction SilentlyContinue

		if ($value) {
			Write-Host "Registry value: $($value.$Name)" -ForegroundColor Cyan
		}
		else {
			Write-Host 'Registry value not found.' -ForegroundColor Red
		}
	}
	catch {
		Write-Host "An error occurred while retrieving the registry value: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# Get-RegistryValue -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion" -Name "ProgramFilesDir"

# Function to calculate the size of a directory
function Show-DirectorySize {
	param(
		[Parameter(Mandatory = $true)]
		[string]$Path
	)

	try {
		Write-Host "Calculating size of directory: $Path" -ForegroundColor Yellow

		if (Test-Path $Path) {
			$size = (Get-ChildItem $Path -Recurse | Measure-Object -Property Length -Sum).Sum
			Write-Host ('Total size of directory {0}: {1} MB' -f $Path, [math]::Round($size / 1MB, 2)) -ForegroundColor Cyan
		}
		else {
			Write-Host "Directory not found: $Path" -ForegroundColor Red
		}
	}
	catch {
		Write-Host "An error occurred while calculating the directory size: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# Show-DirectorySize -Path "C:\Your\Directory\Path"

# Function to retrieve the list of services
function Get-Services {
	try {
		Write-Host 'Retrieving list of services...' -ForegroundColor Yellow

		# Retrieve the list of services
		$services = Get-Service | Select-Object DisplayName, Status

		if ($services.Count -eq 0) {
			Write-Host 'No services found.' -ForegroundColor Yellow
		}
		else {
			# Display the services in a formatted table
			$services | Format-Table -AutoSize
			Write-Host 'Services list retrieved successfully.' -ForegroundColor Green
		}
	}
	catch {
		Write-Host "An error occurred while retrieving services: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# Get-Services

function Get-SystemInfo {
	try {
		Write-Host 'Gathering system information...' -ForegroundColor Yellow

		$os = Get-CimInstance Win32_OperatingSystem
		$cpu = Get-CimInstance Win32_Processor
		$memory = Get-CimInstance Win32_PhysicalMemory | Measure-Object -Property Capacity -Sum
		$disk = Get-CimInstance Win32_LogicalDisk

		$systemInfo = [pscustomobject]@{
			OS              = $os.Caption
			OS_Version      = $os.Version
			CPU             = $cpu.Name
			CPU_Cores       = $cpu.NumberOfCores
			Total_Memory_GB = [math]::Round($memory.Sum / 1GB, 2)
			Disk_Space_GB   = $disk | ForEach-Object {
				[pscustomobject]@{
					DeviceID     = $_.DeviceID
					Size_GB      = [math]::Round($_.Size / 1GB, 2)
					FreeSpace_GB = [math]::Round($_.FreeSpace / 1GB, 2)
				}
			}
		}

		Write-Host 'System information gathered successfully.' -ForegroundColor Green
		$systemInfo | Format-Table -AutoSize
	}
	catch {
		Write-Host "An error occurred: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# Get-SystemInfo

# Function to retrieve environment variables
function Get-EnvironmentVariables {
	Write-Host 'Retrieving environment variables...' -ForegroundColor Yellow
	Get-ChildItem Env: | Format-Table Name, Value
	Write-Host 'Environment variables retrieved.' -ForegroundColor Green
}

function Backup-Files {
	param(
		[string]$SourcePath,
		[string]$DestinationPath
	)

	Write-Host "Backing up files from $SourcePath to $DestinationPath" -ForegroundColor Yellow
	Copy-Item -Path $SourcePath -Destination $DestinationPath -Recurse -Force
	Write-Host 'Backup completed.' -ForegroundColor Green
}

function Get-InstalledSoftware {
	Write-Host 'Retrieving installed software list...' -ForegroundColor Yellow
	Get-WmiObject -Class Win32_Product | Select-Object Name, Version | Format-Table -AutoSize
}

function Register-Task {
	param(
		[Parameter(Mandatory = $true)]
		[string]$TaskName,

		[Parameter(Mandatory = $true)]
		[string]$Command,

		[Parameter(Mandatory = $true)]
		[datetime]$TriggerTime
	)

	try {
		Write-Host "Scheduling task '$TaskName' to run '$Command' at $TriggerTime" -ForegroundColor Yellow

		$action = New-ScheduledTaskAction -Execute $Command
		$trigger = New-ScheduledTaskTrigger -At $TriggerTime
		Register-ScheduledTask -Action $action -Trigger $trigger -TaskName $TaskName -User 'SYSTEM' -RunLevel Highest

		Write-Host "Scheduled task '$TaskName' created." -ForegroundColor Green
	}
	catch {
		Write-Host "An error occurred while scheduling the task: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# Register-Task -TaskName 'MyTask' -Command 'notepad.exe' -TriggerTime (Get-Date).AddMinutes(5)

function Get-FileHash {
	param(
		[string]$FilePath
	)

	Write-Host "Calculating file hash for: $FilePath" -ForegroundColor Yellow
	if (Test-Path $FilePath) {
		Get-FileHash -Path $FilePath | Format-Table Algorithm, Hash
	}
	else {
		Write-Host "File not found: $FilePath" -ForegroundColor Red
	}
}

function editprofile {
	param(
		[string]$ProfilePath = 'C:\Users\Nick\Dropbox\PC (2)\Documents\PowerShell\Microsoft.PowerShell_profile.ps1'
	)

	Write-Host 'Opening Notepad++ with your profile' -ForegroundColor Yellow

	if (-not (Test-Path $ProfilePath)) {
		Write-Host "Profile file not found: $ProfilePath" -ForegroundColor Red
		return
	}

	$notepadPath = 'C:\Program Files\Notepad++\notepad++.exe'
	if (-not (Test-Path $notepadPath)) {
		Write-Host "Notepad++ not found at: $notepadPath" -ForegroundColor Red
		return
	}

	Start-Process -FilePath $notepadPath -ArgumentList "`"$ProfilePath`""
}

function Notepad++ {
	[CmdletBinding()]
	param(
		[Parameter(Position = 0, Mandatory = $false)]
		[string]$FilePath
	)

	Write-Host 'Opening Notepad++...' -ForegroundColor Yellow
	$notepadPath = 'C:\Program Files\Notepad++\notepad++.exe'

	if (-not (Test-Path $notepadPath)) {
		Write-Host "Notepad++ not found at: $notepadPath" -ForegroundColor Red
		return
	}

	if ($FilePath) {
		if (-not (Test-Path $FilePath)) {
			Write-Host "File not found: $FilePath" -ForegroundColor Red
			return
		}
		Start-Process -FilePath $notepadPath -ArgumentList "`"$FilePath`""
	}
	else {
		Start-Process -FilePath $notepadPath
	}
}

# Function to quickly open Visual Studio Code in the current directory
function Open-Code {
	[CmdletBinding()]
	param(
		[string]$Path = '.'
	)

	if (Get-Command code -ErrorAction SilentlyContinue) {
		Write-Host "Opening Visual Studio Code at path: $Path" -ForegroundColor Yellow
		code $Path
	}
	else {
		Write-Host "Error: Visual Studio Code command 'code' not found. Please ensure it is installed and added to your PATH." -ForegroundColor Red
	}
}

# Function to get the size of a directory
function Get-DirSize {
	[CmdletBinding()]
	param(
		[Parameter(ValueFromPipeline = $true)]
		[ValidateNotNullOrEmpty()]
		[string]$Path = '.'
	)

	if (-not (Test-Path -Path $Path)) {
		Write-Warning "Path '$Path' does not exist."
		return 0
	}

	try {
		# Only get files to speed up the process and avoid unnecessary directory objects.
		$files = Get-ChildItem -Path $Path -File -Recurse -ErrorAction Stop
		$size = ($files | Measure-Object -Property Length -Sum).Sum
		return [math]::Round($size / 1MB, 2)
	}
	catch {
		Write-Error "Failed to calculate directory size for path '$Path'. Error: $_"
		return 0
	}
}

# Function to list the top 10 processes by memory usage
function Get-TopProcesses {
	[CmdletBinding()]
	param(
		[int]$Count = 10
	)
	try {
		Get-Process |
			Sort-Object -Property WorkingSet -Descending |
			Select-Object -First $Count -Property `
				Id,
			ProcessName,
			@{ Label = 'Memory (MB)'; Expression = { [math]::Round($_.WorkingSet / 1MB, 2) } } |
			Format-Table -AutoSize
	}
	catch {
		Write-Host "Error retrieving processes: $_" -ForegroundColor Red
	}
}

# Checks and displays available and used disk space for a specified drive.
function Test-DiskSpace {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory = $false)]
		[ValidatePattern('^[A-Za-z]$')]
		[string]$DriveLetter = 'C'
	)

	Write-Verbose "Checking disk space on drive $DriveLetter..."

	try {
		# Attempt to retrieve the drive info; throw error if not found.
		$drive = Get-PSDrive -Name $DriveLetter -PSProvider FileSystem -ErrorAction Stop
	}
	catch {
		Write-Error "Drive $DriveLetter not found or an error occurred: $_"
		return
	}

	# Calculate disk space in GB; fallback to 0 if properties are null.
	$usedGB = if ($drive.Used) { [math]::Round($drive.Used / 1GB, 2) }    else { 0 }
	$freeGB = if ($drive.Free) { [math]::Round($drive.Free / 1GB, 2) }    else { 0 }
	$totalGB = [math]::Round($usedGB + $freeGB, 2)

	$percentUsed = if ($totalGB -gt 0) {
		[math]::Round(($usedGB / $totalGB * 100), 2)
	}
	else {
		0
	}

	# Build an output object to allow for pipelining.
	$result = [PSCustomObject]@{
		Drive       = $DriveLetter
		UsedGB      = $usedGB
		FreeGB      = $freeGB
		TotalGB     = $totalGB
		PercentUsed = $percentUsed
	}

	Write-Output $result
}

# Searches for a specified file by name in a given directory and its subdirectories.
function Search-File {
	param(
		[string]$FileName,
		[string]$DirectoryPath = '.'
	)

	Write-Host "Searching for file '$FileName' in directory '$DirectoryPath'..." -ForegroundColor Yellow
	$file = Get-ChildItem -Path $DirectoryPath -Recurse -Filter $FileName -ErrorAction SilentlyContinue
	if ($file) {
		Write-Host "File found at: $($file.FullName)" -ForegroundColor Green
	}
	else {
		Write-Host 'File not found.' -ForegroundColor Red
	}
}

# Displays network adapter information, including status, IP addresses, and MAC address.
function Get-NetworkAdapterInfo {
	Write-Host 'Retrieving network adapter information...' -ForegroundColor Cyan

	$adapters = Get-NetAdapter
	if (-not $adapters) {
		Write-Host 'No network adapters found.' -ForegroundColor Red
		return
	}

	foreach ($adapter in $adapters) {
		Write-Host "Adapter Name: $($adapter.Name)" -ForegroundColor Yellow
		Write-Host "Status: $($adapter.Status)" -ForegroundColor Magenta
		Write-Host "MAC Address: $($adapter.MacAddress)" -ForegroundColor Blue

		$ipAddresses = $adapter | Get-NetIPAddress
		if ($ipAddresses) {
			foreach ($ip in $ipAddresses) {
				Write-Host " - IP Address: $($ip.IPAddress)" -ForegroundColor White
			}
		}
		else {
			Write-Host ' - No IP Addresses assigned.' -ForegroundColor DarkGray
		}
		Write-Host ('-' * 40) -ForegroundColor DarkCyan
	}

	Write-Host 'Network adapter information retrieved.' -ForegroundColor Green
}

# Restarts Windows Explorer, which can help in refreshing the desktop or resolving minor issues.
function Restart-Explorer {
	Write-Host 'Attempting to restart Windows Explorer...' -ForegroundColor Yellow

	try {
		Write-Host 'Stopping Explorer process...' -ForegroundColor Yellow
		Stop-Process -Name explorer -Force -ErrorAction Stop
		Write-Host 'Explorer process stopped.' -ForegroundColor Cyan
	}
	catch {
		Write-Host "Error stopping Explorer: $_" -ForegroundColor Red
		return
	}

	Start-Sleep -Seconds 1

	try {
		Write-Host 'Starting Explorer process...' -ForegroundColor Yellow
		Start-Process explorer.exe -ErrorAction Stop
		Write-Host 'Explorer restarted successfully.' -ForegroundColor Green
	}
	catch {
		Write-Host "Error starting Explorer: $_" -ForegroundColor Red
	}
}

# Deletes files in the system?s temporary folder to free up space.
function Clear-TempFiles {
	[CmdletBinding()]
	param()

	try {
		Write-Verbose 'Cleaning temporary files...' -Verbose
		if (Test-Path $env:TEMP) {
			Remove-Item -Path "$env:TEMP\*" -Recurse -Force -ErrorAction Stop
		}
		else {
			Write-Verbose 'The TEMP environment variable is not set correctly.' -Verbose
			return
		}
		Write-Verbose 'Temporary files cleaned.' -Verbose
	}
	catch {
		Write-Verbose "An error occurred while cleaning temporary files: $_" -Verbose
	}
}


# Pings a website to verify an active internet connection.
function Test-InternetConnection {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory = $true)]
		[string]$Url
	)

	Write-Verbose 'Testing internet connection...' -Verbose
	try {
		# Remove the protocol if present
		$cleanUrl = $Url -replace 'https?://', ''

		if (Test-Connection -ComputerName $cleanUrl.Split('/')[0] -Count 2 -Quiet) {
			Write-Verbose 'Internet connection is active.' -Verbose
		}
		else {
			Write-Verbose 'Internet connection is not available.' -Verbose
		}
	}
	catch {
		Write-Verbose "An error occurred while testing the internet connection: $_" -Verbose
	}
}


<#
.SYNOPSIS
Changes the desktop wallpaper to a specified image file.

.DESCRIPTION
The Set-Wallpaper function sets the desktop wallpaper to the specified image file. It uses the SystemParametersInfo function from user32.dll to change the wallpaper.

.PARAMETER ImagePath
The full path to the image file that will be set as the wallpaper. This parameter is mandatory.

.EXAMPLE
Set-Wallpaper -ImagePath "C:\Users\Nick\Pictures\wallpaper.jpg"
Sets the desktop wallpaper to the specified image file.

.EXAMPLE
Set-Wallpaper -ImagePath "C:\Wallpapers\new_wallpaper.png"
Changes the desktop wallpaper to the specified PNG image.

.NOTES
Ensure that the image file exists at the specified path. The function will not work if the file is not found.
#>
function Set-Wallpaper {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory = $true)]
		[string]$ImagePath
	)

	Write-Verbose "Setting wallpaper to $ImagePath..." -Verbose

	try {
		if (Test-Path $ImagePath) {
			# Check if the Wallpaper class is already defined
			if (-not ([System.Management.Automation.PSTypeName]'Wallpaper').Type) {
				Add-Type -TypeDefinition @'
                    using System;
                    using System.Runtime.InteropServices;
                    public class Wallpaper {
                        [DllImport("user32.dll", CharSet = CharSet.Auto)]
                        public static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni);
                    }
'@
			}
			# Set the wallpaper using SystemParametersInfo
			[Wallpaper]::SystemParametersInfo(0x0014, 0, $ImagePath, 0x0001)
			Write-Verbose 'Wallpaper set successfully.' -Verbose
		}
		else {
			Write-Verbose "Image file not found: $ImagePath" -Verbose
		}
	}
	catch {
		Write-Verbose "An error occurred while setting the wallpaper: $_" -Verbose
	}
}



# Displays the last boot time of the system.
function Show-LastBootTime {
	Write-Host 'Retrieving last boot time...' -ForegroundColor Yellow
	$bootTime = (Get-CimInstance -ClassName Win32_OperatingSystem).LastBootUpTime
	Write-Host ('Last boot time: {0}' -f $bootTime) -ForegroundColor Cyan
}

# Empties the Recycle Bin for all users on the system.
function Clear-RecycleBin {
	Write-Host 'Emptying Recycle Bin...' -ForegroundColor Yellow
  (New-Object -ComObject Shell.Application).Namespace(10).Items() | ForEach-Object { $_.InvokeVerb('delete') }
	Write-Host 'Recycle Bin emptied.' -ForegroundColor Green
}

# Locks the workstation immediately.
function Lock-Workstation {
	Write-Host 'Locking workstation...' -ForegroundColor Yellow
	rundll32.exe user32.dll, LockWorkStation
	Write-Host 'Workstation locked.' -ForegroundColor Green
}

# Function to monitor a log file in real-time (old)
function Watch-LogFileOld {
	param(
		[string]$filePath
	)
	if (Test-Path $filePath) {
		Get-Content $filePath -Wait -Tail 10
	}
	else {
		Write-Host 'File not found!'
	}
}

# Function to monitor a log file in real-time

function Watch-LogFile {
	param(
		[string]$LogFilePath,
		[string]$Keyword
	)

	Write-Host "Monitoring $LogFilePath for occurrences of '$Keyword'..." -ForegroundColor Yellow
	if (Test-Path $LogFilePath) {
		Get-Content $LogFilePath -Wait | ForEach-Object {
			if ($_ -match $Keyword) {
				Write-Host $_ -ForegroundColor Red
			}
		}
	}
	else {
		Write-Host "Log file not found: $LogFilePath" -ForegroundColor Red
	}
}


# Function to search for a string in files within a directory
function Search-InFiles {
	param(
		[Parameter(Mandatory = $true)]
		[string]$directory,

		[Parameter(Mandatory = $true)]
		[string]$searchString
	)

	if (Test-Path $directory) {
		Write-Host "Searching for '$searchString' in files under '$directory'..." -ForegroundColor Yellow

		Get-ChildItem -Path $directory -Recurse -File |
			Select-String -Pattern $searchString |
			ForEach-Object {
				[pscustomobject]@{
					FilePath   = $_.Path
					LineNumber = $_.LineNumber
					Line       = $_.Line
				}
			} | Format-Table -AutoSize

		Write-Host 'Search completed.' -ForegroundColor Green
	}
	else {
		Write-Host "Directory not found: $directory" -ForegroundColor Red
	}
}

# Example usage:
# Search-InFiles -directory "C:\Your\Directory\Path" -searchString "your search string"

# Function to download a file from a URL
function Get-File {
	param(
		[string]$url,
		[string]$destinationPath
	)
	try {
		Invoke-WebRequest -Uri $url -OutFile $destinationPath
		Write-Host "File downloaded successfully to $destinationPath"
	}
	catch {
		Write-Host "Failed to download file: $_"
	}
}

# Function to check the status of a website
function Test-WebsiteStatus {
	param(
		[string]$url
	)
	try {
		$response = Invoke-WebRequest -Uri $url -UseBasicParsing
		Write-Host "Website is up. Status code: $($response.StatusCode)"
	}
	catch {
		Write-Host "Website is down or inaccessible: $_"
	}
}

# Function to get the IP address of a hostname
function Get-IPFromHostname {
	param(
		[string]$hostname
	)
	try {
		$ip = [System.Net.Dns]::GetHostAddresses($hostname)
		Write-Host "IP Address(es) for $hostname $ip"
	}
	catch {
		Write-Host "Failed to resolve hostname: $_"
	}
}

# Function to archive old files in a directory
function Compress-OldFiles {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory = $true)]
		[string]$directory,
		[Parameter(Mandatory = $true)]
		[int]$daysOld
	)

	try {
		Write-Verbose "Archiving files older than $daysOld days from $directory..." -Verbose

		$archivePath = Join-Path $directory "Archive_$(Get-Date -Format 'yyyyMMdd')"
		New-Item -ItemType Directory -Path $archivePath -Force

		Get-ChildItem -Path $directory -File | Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-$daysOld) } | ForEach-Object {
			Move-Item -Path $_.FullName -Destination $archivePath
		}

		Write-Verbose "Files older than $daysOld days have been archived to $archivePath" -Verbose
	}
	catch {
		Write-Verbose "An error occurred while archiving files: $_" -Verbose
	}
}


# Function to monitor CPU and memory usage
function Watch-SystemUsage {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory = $false)][ValidateRange(1, 3600)][int]$interval = 5,
		[Parameter(Mandatory = $false)][ValidateRange(1, 86400)][int]$duration = 60
	)

	try {
		$endTime = (Get-Date).AddSeconds($duration)
		Write-Host "Monitoring system usage every $interval seconds for $duration seconds..." -ForegroundColor Yellow

		while ((Get-Date) -lt $endTime) {
			$cpu = Get-Counter '\Processor(_Total)\% Processor Time'
			$memory = Get-Counter '\Memory\Available MBytes'

			[pscustomobject]@{
				TimeStamp          = Get-Date
				CPU_Usage          = [math]::Round($cpu.CounterSamples.CookedValue, 2)
				AvailableMemory_MB = [math]::Round($memory.CounterSamples.CookedValue, 2)
			} | Format-Table -AutoSize

			Start-Sleep -Seconds $interval
		}

		Write-Host 'System usage monitoring completed.' -ForegroundColor Green
	}
	catch {
		Write-Host "An error occurred while monitoring system usage: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# Watch-SystemUsage -interval 5 -duration 60

# Function to send an email with system information
function Send-SystemInfoEmail {
	param(
		[string]$to,
		[string]$from,
		[string]$smtpServer
	)

	$systemInfo = Get-SystemInfo
	$body = $systemInfo | Out-String

	$message = @{
		To         = $to
		From       = $from
		Subject    = 'System Information Report'
		Body       = $body
		SmtpServer = $smtpServer
	}

	Send-MailMessage @message
	Write-Host "System information email sent to $to"
}

function Backup-And-Compress {
	param(
		[Parameter(Mandatory = $true)]
		[string]$SourcePath,

		[Parameter(Mandatory = $true)]
		[string]$DestinationFolder,

		[string]$ArchiveName = 'Backup'
	)

	try {
		Write-Host "Creating compressed backup of $SourcePath..." -ForegroundColor Yellow

		# Check if the source path exists
		if (Test-Path $SourcePath) {
			# Ensure the destination folder exists
			if (-not (Test-Path $DestinationFolder)) {
				Write-Host "Destination folder does not exist. Creating $DestinationFolder..." -ForegroundColor Yellow
				New-Item -ItemType Directory -Path $DestinationFolder -Force | Out-Null
			}

			# Generate the timestamp and zip path
			$timestamp = (Get-Date -Format 'yyyyMMdd_HHmmss')
			$zipPath = Join-Path -Path $DestinationFolder -ChildPath "${ArchiveName}_$timestamp.zip"

			# Add .NET assembly for compression
			Add-Type -AssemblyName System.IO.Compression.FileSystem

			# Create the zip archive
			[System.IO.Compression.ZipFile]::CreateFromDirectory($SourcePath, $zipPath)
			Write-Host "Backup created successfully: $zipPath" -ForegroundColor Green
		}
		else {
			Write-Host "Source path not found: $SourcePath" -ForegroundColor Red
		}
	}
	catch {
		Write-Host "An error occurred during the backup process: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# Backup-And-Compress -SourcePath "C:\Users\Nick\Documents" -DestinationFolder "C:\Backups"

# function provides system uptime details and warns the user if the uptime exceeds a specified threshold, prompting them to restart the machine.
function Test-SystemUptime {
	param(
		[int]$RestartThresholdHours = 72
	)

	Write-Host 'Checking system uptime...' -ForegroundColor Yellow
	$uptime = (Get-Date) - (Get-CimInstance -ClassName Win32_OperatingSystem).LastBootUpTime
	Write-Host ('System uptime: {0} days, {1} hours' -f $uptime.Days, $uptime.Hours) -ForegroundColor Cyan

	if ($uptime.TotalHours -ge $RestartThresholdHours) {
		Write-Host ('WARNING: System uptime exceeds {0} hours. A restart is recommended.' -f $RestartThresholdHours) -ForegroundColor Red
	}
	else {
		Write-Host 'System uptime is within acceptable range.' -ForegroundColor Green
	}
}

function Update-WindowsDefender {
	Write-Host 'Checking Windows Defender status and performing update if needed...' -ForegroundColor Yellow
	$status = Get-MpComputerStatus
	if ($status.AntispywareEnabled -and $status.AntivirusEnabled) {
		Write-Host 'Windows Defender is enabled. Starting update...' -ForegroundColor Cyan
		Start-MpWDOScan
		Write-Host 'Update completed.' -ForegroundColor Green
	}
	else {
		Write-Host 'Windows Defender is disabled or not fully enabled.' -ForegroundColor Red
	}
}

function Test-NetworkLatency {
	param(
		[string]$Mode
	)

	# Prompt the user for the mode if not provided
	if (-not $Mode) {
		$Mode = Read-Host 'Enter mode (Lite, Full, Complete)'
	}

	# Validate the mode
	if ($Mode -notin @('Lite', 'Full', 'Complete')) {
		Write-Host "Invalid mode. Please enter 'Lite', 'Full', or 'Complete'." -ForegroundColor Red
		return
	}

	# Define the full server list
	$Servers = @{
		# Lite Servers (Core)
		'Google DNS (US)'                              = '8.8.8.8'
		'Cloudflare DNS (Global)'                      = '1.1.1.1'
		'OpenDNS (US)'                                 = '208.67.222.222'
		'Quad9 DNS (Switzerland)'                      = '9.9.9.9'
		'Google (US)'                                  = 'www.google.com'
		'YouTube (US)'                                 = '142.251.32.110'
		'GitHub (US)'                                  = '199.232.68.133'

		# Full Servers (Regional and Additional)
		'Microsoft Azure (US)'                         = '13.107.21.200'
		'Cloudflare Backup DNS (Global)'               = '1.0.0.1'
		'StackOverflow (US)'                           = '104.16.248.249'
		'Reddit (US, Fastly)'                          = '151.101.1.140'
		'AWS (Amazon, US)'                             = '52.95.110.1'
		'Twitter (US, Fastly)'                         = '151.101.65.69'
		'AWS Global DNS (US)'                          = '205.251.242.103'
		'GitHub Pages (US)'                            = '185.199.108.153'
		'Telstra (Australia)'                          = '203.98.7.65'
		'TPG (Australia)'                              = '202.9.36.5'
		'Etisalat (UAE)'                               = '195.229.241.222'
		'Google (EU, Germany)'                         = '194.42.48.50'
		'Cloudflare (EU)'                              = '185.45.22.35'
		'Baidu (China)'                                = '180.101.49.12'
		'Yandex (Russia)'                              = '77.88.55.242'
		'BBC (UK)'                                     = '151.101.192.81'
		'NTT (Japan)'                                  = '129.250.2.40'

		# Complete Servers (Obscure and Remote)
		'Akamai (US)'                                  = '23.49.92.19'
		'Verizon (US)'                                 = '198.6.1.1'
		'Swisscom (Switzerland)'                       = '195.186.1.111'
		'Orange (France)'                              = '193.252.19.3'
		'Deutsche Telekom (Germany)'                   = '194.25.2.129'
		'KDDI (Japan)'                                 = '124.83.179.145'
		'Rakuten (Japan)'                              = '133.237.2.9'
		'Vodafone (UK)'                                = '88.82.13.59'
		'Comcast (US)'                                 = '68.87.85.102'
		'OVH (France)'                                 = '51.38.120.1'
		'China Telecom (China)'                        = '202.97.224.68'
		'Bell (Canada)'                                = '184.150.200.200'
		'SK Broadband (South Korea)'                   = '61.100.224.6'
		'Telmex (Mexico)'                              = '200.23.202.42'
		'Movistar (Spain)'                             = '80.58.61.250'
		'Tata Communications (India)'                  = '14.141.41.1'
		'Telkom (South Africa)'                        = '196.25.1.1'
		'Singtel (Singapore)'                          = '165.21.83.88'
		'Telenor (Norway)'                             = '148.122.252.25'
		'MTN (South Africa)'                           = '41.74.192.1'
		'Vodacom (South Africa)'                       = '196.207.40.1'
		'Liquid Telecom (Kenya)'                       = '196.201.214.100'
		'Airtel (Nigeria)'                             = '105.112.0.20'
		'Orange (Ivory Coast)'                         = '41.207.12.1'
		'Maroc Telecom (Morocco)'                      = '41.140.0.1'
		'Etisalat (Egypt)'                             = '41.65.0.1'
		'Tunisie Telecom (Tunisia)'                    = '41.224.0.1'
		'Zamtel (Zambia)'                              = '102.134.124.1'
		'Ghana Telecom (Ghana)'                        = '196.216.164.1'
		'Claro (Brazil)'                               = '200.221.11.100'
		'Telefónica (Argentina)'                       = '200.45.192.1'
		'Entel (Chile)'                                = '200.63.96.1'
		'Movistar (Peru)'                              = '190.223.32.1'
		'Antel (Uruguay)'                              = '168.83.0.1'
		'Tigo (Colombia)'                              = '190.90.0.1'
		'CANTV (Venezuela)'                            = '200.44.192.1'
		'CNT (Ecuador)'                                = '190.57.128.1'
		'Tigo (Paraguay)'                              = '190.98.0.1'
		'Claro (Panama)'                               = '200.55.192.1'
		'Siminn (Iceland)'                             = '82.221.112.1'
		'MTS (Siberia, Russia)'                        = '213.87.0.1'
		'Rostelecom (Far East, Russia)'                = '94.25.0.1'
		'FarEasTone (Taiwan)'                          = '210.241.224.1'
		'Telia (Estonia)'                              = '213.35.0.1'
		'Lattelecom (Latvia)'                          = '213.175.0.1'
		'Telia (Lithuania)'                            = '213.190.0.1'
		'Moldtelecom (Moldova)'                        = '217.26.128.1'
		'Telemach (Slovenia)'                          = '195.29.0.1'
		'T-Mobile (Czech Republic)'                    = '194.228.0.1'
		'McMurdo Station (US Antarctic Program)'       = '144.92.235.1'
		'South Pole Telescope (Antarctica)'            = '198.11.240.1'
		'Pitcairn Island (British Overseas Territory)' = '202.90.84.1'
		'Easter Island (Rapa Nui, Chile)'              = '200.7.200.1'
		'Svalbard Satellite Station (Norway)'          = '158.39.0.1'
		'Barrow, Alaska (USA)'                         = '72.42.184.1'
		'Mount Everest Base Camp (Nepal)'              = '202.52.240.1'
		'Denali National Park (Alaska, USA)'           = '72.42.184.1'
		'Atacama Desert (Chile)'                       = '200.7.200.1'
		'Hawaii (USA)'                                 = '72.42.184.1'
		'Guam (US Territory)'                          = '202.123.0.1'
		'NASA Deep Space Network (DSN)'                = '198.116.142.1'
		'European Space Agency (ESA) Ground Station'   = '193.146.0.1'
		'Greenland'                                    = '194.177.0.1'
		'Iceland'                                      = '82.221.112.1'
		'Siberia (Russia)'                             = '94.25.0.1'
	}

	switch ($Mode) {
		# Filter servers based on mode
		'Lite' {
			$selectedServers = $Servers.GetEnumerator() | Where-Object { $_.Key -in @(
					'Google DNS (US)', 'Cloudflare DNS (Global)', 'OpenDNS (US)', 'Quad9 DNS (Switzerland)', 'Google (US)', 'YouTube (US)', 'GitHub (US)'
				) }
		}
		'Full' {
			$selectedServers = $Servers.GetEnumerator() | Where-Object { $_.Key -notin @(
					'McMurdo Station (US Antarctic Program)', 'South Pole Telescope (Antarctica)',
					'Pitcairn Island (British Overseas Territory)', 'Easter Island (Rapa Nui, Chile)',
					'Svalbard Satellite Station (Norway)', 'Barrow, Alaska (USA)', 'Mount Everest Base Camp (Nepal)',
					'Denali National Park (Alaska, USA)', 'Atacama Desert (Chile)', 'Hawaii (USA)', 'Guam (US Territory)',
					'NASA Deep Space Network (DSN)', 'European Space Agency (ESA) Ground Station', 'Greenland',
					'Iceland', 'Siberia (Russia)'
				) }
		}
		'Complete' {
			# No filter needed for Complete mode
			$selectedServers = $Servers.GetEnumerator()
		}
	}

	Write-Host "Testing network latency in $Mode mode..." -ForegroundColor Yellow
	$jobs = @()

	foreach ($server in $selectedServers) {
		$job = Start-Job -ScriptBlock {
			param ($serverName, $serverAddress)
			$result = @{
				Server  = $serverName
				Address = $serverAddress
				Latency = 'Unreachable'
			}
			try {
				$latency = (Test-Connection -ComputerName $serverAddress -Count 5 -ErrorAction Stop |
						Measure-Object -Property Latency -Average).Average

				if ($latency) {
					$result.Latency = [math]::Round($latency, 2).ToString() + ' ms'
				}
			}
			catch {
				$result.Latency = 'Error'
			}
			return $result
		} -ArgumentList $server.Key, $server.Value
		$jobs += $job
	}

	$results = $jobs | ForEach-Object {
		$jobResult = Receive-Job -Job $_ -Wait
		Write-Host "Latency to $($jobResult.Server): $($jobResult.Latency)" -ForegroundColor Green
		$jobResult
	}

	Write-Host 'Latency Results:' -ForegroundColor Magenta
	$results | Format-Table -AutoSize
	Write-Host 'Network latency test completed.' -ForegroundColor Yellow
}

# Example usage:
# Test-NetworkLatency


# Retrieves a report of recent security-related log entries.
function Get-SecurityAuditLogs {
	param(
		[int]$Days = 7
	)

	# Validate the Days parameter
	if ($Days -le 0) {
		Write-Host 'Invalid value for Days. Please enter a positive integer.' -ForegroundColor Red
		return
	}

	# Inform the user that the process is starting
	Write-Host "Retrieving security audit logs from the past $Days days..." -ForegroundColor Yellow

	try {
		# Retrieve the security audit logs
		$logs = Get-EventLog -LogName Security -After (Get-Date).AddDays(- $Days) |
			Select-Object TimeGenerated, EntryType, Source, EventID, Message

		if ($logs) {
			# Display the logs in a table format
			Write-Host 'Security audit logs retrieved.' -ForegroundColor Green
			$logs | Format-Table -AutoSize
		}
		else {
			# Inform the user if no logs were found
			Write-Host "No security audit logs found for the past $Days days." -ForegroundColor Cyan
		}
	}
	catch {
		# Handle any errors that occur during the retrieval process
		Write-Host "An error occurred while retrieving the security audit logs: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# Get-SecurityAuditLogs -Days 7

# Generates a detailed disk usage report for each folder in a specified directory, which is useful for analyzing disk space usage.
function Get-DiskUsageReport {
	param(
		[string]$Path = '.'
	)

	Write-Host "Generating disk usage report for $Path..." -ForegroundColor Yellow
	if (Test-Path $Path) {
		Get-ChildItem -Path $Path -Directory | ForEach-Object {
			$size = (Get-ChildItem -Path $_.FullName -Recurse -File | Measure-Object -Property Length -Sum).Sum
			[pscustomobject]@{
				FolderName = $_.Name
				SizeMB     = [math]::Round($size / 1MB, 2)
			}
		} | Sort-Object SizeMB -Descending | Format-Table -AutoSize
	}
	else {
		Write-Host "Directory not found: $Path" -ForegroundColor Red
	}
}

# change directory to github folder
function cdgithub {
	try {
		# Informing the user that the script is changing to the GitHub folder
		Write-Host 'Changing to GitHub folder...' -ForegroundColor Blue

		# Attempt to change the directory
		Set-Location 'C:\Users\Nick\Dropbox\PC (2)\Documents\GitHub\UserStyles'

		# Informing the user that the directory change was successful
		Write-Host 'Successfully changed to GitHub folder.' -ForegroundColor Green
	}
	catch {
		# Handling any errors that occur during the directory change
		Write-Host 'Failed to change to GitHub folder.' -ForegroundColor Red
		Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
	}
}
# Example usage:
# cdgithub

function Get-SystemInformationReport {
	param(
		[string]$ReportPath = "$env:USERPROFILE\Desktop\SystemReport.html"
	)

	try {
		Write-Host 'Gathering system information...' -ForegroundColor Yellow

		# Gather system information
		$systemInfo = @{
			'Computer Name'  = $env:COMPUTERNAME
			'User Name'      = $env:USERNAME
			'OS Version'     = (Get-CimInstance Win32_OperatingSystem).Caption
			'System Type'    = (Get-CimInstance Win32_ComputerSystem).SystemType
			'CPU'            = (Get-CimInstance Win32_Processor).Name
			'RAM (GB)'       = '{0:N2}' -f ((Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory / 1GB)
			'IP Address'     = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias 'Ethernet').IPAddress
			'MAC Address'    = (Get-NetAdapter -Name 'Ethernet').MacAddress
			'Last Boot Time' = (Get-CimInstance Win32_OperatingSystem).LastBootUpTime
		}

		# Get list of installed software
		Write-Host 'Retrieving installed software...' -ForegroundColor Yellow
		$installedSoftware = Get-ItemProperty HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* |
			Select-Object DisplayName, DisplayVersion, Publisher, InstallDate |
			Where-Object { $_.DisplayName } |
			Sort-Object DisplayName

		# Get list of running services
		Write-Host 'Fetching running services...' -ForegroundColor Yellow
		$runningServices = Get-Service | Where-Object { $_.Status -eq 'Running' } |
			Select-Object Name, DisplayName, Status

		# Generate HTML report
		Write-Host 'Generating HTML report...' -ForegroundColor Yellow
		$htmlReport = @'
<html>
<head>
    <title>System Information Report</title>
    <style>
        body { font-family: Arial, sans-serif; }
        h1 { color: #336699; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #dddddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        tr:nth-child(even) { background-color: #f9f9f9; }
    </style>
</head>
<body>
    <h1>System Information Report</h1>
    <h2>General Information</h2>
    <table>
        <tbody>
'@

		foreach ($key in $systemInfo.Keys) {
			$htmlReport += "            <tr><th>$key</th><td>$($systemInfo[$key])</td></tr>`n"
		}

		$htmlReport += @'
        </tbody>
    </table>
    <h2>Installed Software</h2>
    <table>
        <thead>
            <tr>
                <th>Software Name</th>
                <th>Version</th>
                <th>Publisher</th>
                <th>Install Date</th>
            </tr>
        </thead>
        <tbody>
'@

		foreach ($app in $installedSoftware) {
			$installDate = if ($app.InstallDate) { [datetime]::ParseExact($app.InstallDate, 'yyyyMMdd', $null) } else { 'N/A' }
			$htmlReport += "            <tr><td>$($app.DisplayName)</td><td>$($app.DisplayVersion)</td><td>$($app.Publisher)</td><td>$installDate</td></tr>`n"
		}

		$htmlReport += @'
        </tbody>
    </table>
    <h2>Running Services</h2>
    <table>
        <thead>
            <tr>
                <th>Service Name</th>
                <th>Display Name</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
'@

		foreach ($service in $runningServices) {
			$htmlReport += "            <tr><td>$($service.Name)</td><td>$($service.DisplayName)</td><td>$($service.Status)</td></tr>`n"
		}

		$htmlReport += @'
        </tbody>
    </table>
</body>
</html>
'@

		# Save the report to the specified path
		$htmlReport | Out-File -FilePath $ReportPath -Encoding UTF8
		Write-Host "System information report generated at $ReportPath" -ForegroundColor Green

	}
 catch {
		Write-Host "An error occurred: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# Get-SystemInformationReport -ReportPath "C:\Users\Nick\Desktop\SystemReport.html"

# Function to Test Website Availability and Measure Response Time
function Test-WebsiteResponse {
	param(
		[Parameter(Mandatory = $true)]
		[string]$Url
	)

	try {
		# Informing the user that the website response check is starting
		Write-Host "Checking website response for $Url..." -ForegroundColor Cyan

		# Creating the web request and starting the stopwatch
		$request = [System.Net.WebRequest]::Create($Url)
		$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
		$response = $request.GetResponse()
		$stopwatch.Stop()

		# Displaying the response time if the website is reachable
		Write-Host "Website is reachable. Response time: $($stopwatch.ElapsedMilliseconds) ms." -ForegroundColor Green

		# Closing the response
		$response.Close()
	}
	catch {
		# Handling any errors that occur and displaying an error message
		Write-Host "Website is not reachable. Error: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# Test-WebsiteResponse -Url "https://www.example.com"
# Invoke-Traceroute, performs a traceroute to a specified destination to diagnose network paths.Port
function Invoke-Traceroute {
	param(
		[Parameter(Mandatory = $true)]
		[string]$Destination,
		[int]$MaxHops = 30,
		[int]$Timeout = 5000
	)

	Write-Host "Tracing route to $Destination with a maximum of $MaxHops hops:`n" -ForegroundColor Cyan

	for ($ttl = 1; $ttl -le $MaxHops; $ttl++) {
		try {
			$ping = New-Object System.Net.NetworkInformation.Ping
			$options = New-Object System.Net.NetworkInformation.PingOptions ($ttl, $false)
			$buffer = ([System.Text.Encoding]::ASCII.GetBytes('Test'))
			$reply = $ping.Send($Destination, $Timeout, $buffer, $options)

			if ($reply.Status -eq 'Success' -or $reply.Status -eq 'TtlExpired') {
				$hostname = try {
					[System.Net.Dns]::GetHostEntry($reply.Address).HostName
				}
				catch {
					$reply.Address.IPAddressToString
				}

				Write-Host "$ttl`t$hostname`t$($reply.RoundtripTime) ms" -ForegroundColor Green

				if ($reply.Status -eq 'Success') {
					Write-Host 'Trace complete.' -ForegroundColor Yellow
					break
				}
			}
			else {
				Write-Host "$ttl`t*`tRequest timed out." -ForegroundColor Red
			}
		}
		catch {
			Write-Host "$ttl`t*`tError: $($_.Exception.Message)" -ForegroundColor Red
		}
	}
}

# Example usage:
# Invoke-Traceroute -Destination "www.example.com"
# Test-Port, checks if a specific TCP port on a remote host is open.
function Test-Port {
	param(
		[Parameter(Mandatory = $true)]
		[string]$ComputerName,
		[Parameter(Mandatory = $true)]
		[int]$Port,
		[int]$Timeout = 5000
	)

	try {
		$address = [System.Net.Dns]::GetHostEntry($ComputerName).AddressList[0]
		$socket = New-Object System.Net.Sockets.TcpClient
		$asyncResult = $socket.BeginConnect($address, $Port, $null, $null)
		$wait = $asyncResult.AsyncWaitHandle.WaitOne($Timeout, $false)
		if ($wait -and $socket.Connected) {
			$socket.EndConnect($asyncResult)
			Write-Host "Connection to $ComputerName on port $Port succeeded." -ForegroundColor Green
			$socket.Close()
		}
		else {
			Write-Host "Connection to $ComputerName on port $Port timed out." -ForegroundColor Red
			$socket.Close()
		}
	}
	catch {
		Write-Host "Connection to $ComputerName on port $Port failed. Error: $_" -ForegroundColor Red
	}
}

# Test-MultiHostLatency, pings multiple hosts and reports their average response times.
function Test-MultiHostLatency {
	param(
		[Parameter(Mandatory = $true)]
		[string[]]$Hosts,
		[int]$PingCount = 4
	)

	$results = @()

	foreach ($host in $Hosts) {
		Write-Host "Pinging $host..." -ForegroundColor Cyan
		try {
			$pingResults = Test-Connection -ComputerName $host -Count $PingCount -ErrorAction Stop
			if ($pingResults) {
				$avgTime = ($pingResults | Measure-Object -Property ResponseTime -Average).Average
				Write-Host "Average latency to $($host): $avgTime ms" -ForegroundColor Green
				$results += [pscustomobject]@{
					Host    = $host
					Latency = '{0:N2} ms' -f $avgTime
				}
			}
		}
		catch {
			Write-Host "Could not reach $host. Error: $($_.Exception.Message)" -ForegroundColor Red
			$results += [pscustomobject]@{
				Host    = $host
				Latency = 'Unreachable'
			}
		}
	}

	Write-Host "`nLatency Results:" -ForegroundColor Yellow
	$results | Format-Table -AutoSize
}

# Example usage:
# Test-MultiHostLatency -Hosts "www.example.com", "www.google.com"

# Get-SSLCertificateExpiry, checks the SSL certificate expiry date for HTTPS websites.
function Get-SSLCertificateExpiry {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory = $true)]
		[string[]]$Urls
	)

	foreach ($url in $Urls) {
		try {
			Write-Verbose "Retrieving certificate information for $url..." -Verbose

			$request = [System.Net.HttpWebRequest]::Create($url)
			$request.Method = 'GET'
			$request.AllowAutoRedirect = $false
			$request.Timeout = 5000

			# Remove the unused $response assignment
			# $response = $request.GetResponse()

			$certificate = $request.ServicePoint.Certificate
			$cert2 = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2 $certificate

			$expiryDate = $cert2.NotAfter

			Write-Verbose "$url certificate expires on $expiryDate" -Verbose
		}
		catch {
			Write-Verbose "Could not retrieve certificate information for $url. Error: $_" -Verbose
		}
	}
}



# scans your local network by pinging IP addresses within your subnet range to identify active devices.
function Find-LocalNetworkDevices {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory = $true)]
		[int]$Timeout
	)

	$Timeout = $Timeout -or 200 # Set default value if not provided

	try {
		# Get local IPv4 address and subnet prefix length
		$adapter = Get-NetIPAddress -AddressFamily IPv4 |
			Where-Object { $_.IPAddress -ne '127.0.0.1' -and $_.PrefixOrigin -ne 'WellKnown' }

		if (-not $adapter) {
			Write-Verbose 'No active network adapters found.' -Verbose
			return
		}

		$ipAddress = $adapter.IPAddress
		$prefixLength = $adapter.PrefixLength

		# Get starting and ending IP addresses in the subnet
		$network = [System.Net.IPNetwork]::Parse("$ipAddress/$prefixLength")
		$startIp = [System.Net.IPAddress]::Parse(($network.Network + 1).ToString())
		$endIp = [System.Net.IPAddress]::Parse(($network.Broadcast - 1).ToString())

		# Convert IP addresses to integer for iteration
		$startIpBytes = $startIp.GetAddressBytes()
		$endIpBytes = $endIp.GetAddressBytes()

		# Reverse byte arrays manually
		[array]::Reverse($startIpBytes)
		[array]::Reverse($endIpBytes)

		# Convert reversed byte arrays to UInt32
		$startIpInt = [BitConverter]::ToUInt32($startIpBytes, 0)
		$endIpInt = [BitConverter]::ToUInt32($endIpBytes, 0)

		Write-Verbose 'Scanning network for active devices...' -Verbose
		$liveHosts = @()

		for ($ipInt = $startIpInt; $ipInt -le $endIpInt; $ipInt++) {
			$ipBytes = [BitConverter]::GetBytes($ipInt)
			[array]::Reverse($ipBytes) # Reverse byte order for each iteration
			$currentIp = [System.Net.IPAddress]::Parse(([System.Net.IPAddress]$ipBytes).ToString())

			# Ping the current IP address
			$pingReply = Test-Connection -ComputerName $currentIp -Quiet -Count 1 -TimeoutMilliseconds $Timeout

			if ($pingReply) {
				try {
					$hostname = ([System.Net.Dns]::GetHostEntry($currentIp)).HostName
				}
				catch {
					$hostname = 'Unknown'
				}
				Write-Verbose "Active device found: $currentIp ($hostname)" -Verbose
				$liveHosts += [pscustomobject]@{
					IPAddress = $currentIp.IPAddressToString
					HostName  = $hostname
				}
			}
		}

		if ($liveHosts.Count -eq 0) {
			Write-Verbose 'No active devices found on the network.' -Verbose
		}
		else {
			Write-Verbose 'Active Devices:' -Verbose
			$liveHosts | Format-Table -AutoSize
		}
	}
	catch {
		Write-Verbose "An error occurred: $_" -Verbose
	}
}

# If your network uses a standard /24 subnet (255.255.255.0), you can use a simplified version:
function Find-LocalNetworkDevicesSimple {
	param(
		[int]$Timeout = 200 # Timeout in milliseconds for each ping
	)

	# Ensure the timeout is greater than zero
	$TimeoutSeconds = [math]::Max(1, $Timeout / 1000)

	# Get the first three octets of the local IP address
	$localIp = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -eq 'Ethernet' })[0].IPAddress
	$networkPrefix = ($localIp -split '\.')[0..2] -join '.'

	Write-Host "Scanning network $networkPrefix.0/24 for active devices..." -ForegroundColor Yellow
	$liveHosts = @()

	for ($i = 1; $i -le 254; $i++) {
		$ip = "$networkPrefix.$i"
		$pingReply = Test-Connection -ComputerName $ip -Quiet -Count 1 -TimeoutSeconds $TimeoutSeconds

		if ($pingReply) {
			try {
				$hostname = ([System.Net.Dns]::GetHostEntry($ip)).HostName
			}
			catch {
				$hostname = 'Unknown'
			}
			Write-Host "Active device found: $ip ($hostname)" -ForegroundColor Green
			$liveHosts += [pscustomobject]@{
				IPAddress = $ip
				HostName  = $hostname
			}
		}
	}

	if ($liveHosts.Count -eq 0) {
		Write-Host 'No active devices found on the network.' -ForegroundColor Red
	}
	else {
		Write-Host 'Active Devices:' -ForegroundColor Cyan
		$liveHosts | Format-Table -AutoSize
	}
}

# function reads the ARP (Address Resolution Protocol) cache on your computer to list local devices that have communicated recently. It doesn?t actively scan but provides a quick snapshot of devices previously contacted.
function Get-ARPTableDevices {
	$arpTable = arp -a | ForEach-Object {
		if ($_ -match '(\d{1,3}\.){3}\d{1,3}\s+([a-fA-F0-9-]{17})') {
			$ip, $mac = $_ -match '(\d{1,3}\.){3}\d{1,3}', $matches[0]
			[pscustomobject]@{
				IPAddress  = $ip
				MacAddress = $mac
			}
		}
	}
	Write-Output $arpTable | Format-Table -AutoSize
}

# If you have Nmap installed, PowerShell can invoke it to perform a more thorough network scan.
# Function to find devices using Nmap
# Note: Nmap must be installed and available in the system's PATH
# Requires administrative privileges to run
function Find-DevicesWithNmap {
	param(
		[string]$Network = '192.168.1.0/24' # Replace with your network if different
	)

	# Ensure nmap is installed
	if (!(Get-Command nmap -CommandType Application -ErrorAction SilentlyContinue)) {
		Write-Host 'Nmap is not installed. Please install Nmap to use this function.' -ForegroundColor Red
		Write-Host 'You can download Nmap from https://nmap.org/download.html' -ForegroundColor Yellow
		return
	}

	Write-Host "Scanning local network ($Network) with Nmap..." -ForegroundColor Yellow
	$nmapResult = & nmap -sn $Network -oG - | Select-String 'Host: ' | ForEach-Object {
		$line = $_.Line
		$hostname = ($line -split ' ')[1]
		$mac = if ($line -match 'MAC Address: ([\w:]+)') { $matches[1] }    else { 'Unknown' }
		$vendor = if ($line -match 'MAC Address: \S+ \((.+)\)') { $matches[1] }    else { 'Unknown' }
		[pscustomobject]@{
			Host   = $hostname
			MAC    = $mac
			Vendor = $vendor
		}
	}

	Write-Output $nmapResult | Format-Table -AutoSize
}


# Get-NetNeighbor retrieves information about neighbors on the local subnet if the devices support the Neighbor Discovery Protocol (NDP), such as other Windows devices.
# Find-LocalNetworkNeighbors retrieves information about neighbors on the local subnet
# if the devices support the Neighbor Discovery Protocol (NDP), such as other Windows devices.
function Find-LocalNetworkNeighbors {
	try {
		# Retrieve neighbors that are in a 'Reachable' state
		Get-NetNeighbor | Where-Object { $_.State -eq 'Reachable' } | ForEach-Object {
			[pscustomobject]@{
				IPAddress        = $_.IPAddress
				LinkLayerAddress = $_.LinkLayerAddress
				InterfaceAlias   = $_.InterfaceAlias
			}
		} | Format-Table -AutoSize
	}
	catch {
		Write-Host 'An error occurred while retrieving network neighbors.' -ForegroundColor Red
	}
}


# This function uses DNS Service Discovery (mDNS) to discover devices that broadcast their names (like some printers, smart devices, and Apple devices).
function Find-mDNSDevices {
	Write-Host 'Discovering devices using mDNS (Multicast DNS)...'

	try {
		# Load the System.Net.DnsClient library if available (for mDNS resolution)
		$devices = Resolve-DnsName -Name '_services._dns-sd._udp.local' -Type PTR -ErrorAction SilentlyContinue

		if ($devices) {
			foreach ($device in $devices) {
				Write-Host "Found device: $($device.NameHost)" -ForegroundColor Green
			}
			Write-Host "Total devices found: $($devices.Count)" -ForegroundColor Yellow
		}
		else {
			Write-Host 'No devices found using mDNS.' -ForegroundColor Yellow
		}
	}
	catch {
		Write-Host 'mDNS is not fully supported on this system or an error occurred.' -ForegroundColor Red
	}
}


# PowerShell function that retrieves the ARP table and maps IP addresses to devices by resolving hostnames:
function Get-NetworkDeviceMap {
	# Retrieve ARP table entries
	try {
		$arpEntries = arp -a | ForEach-Object {
			$line = $_.Trim()
			if ($line -match '^\s*(\d{1,3}(?:\.\d{1,3}){3})\s+([-\w\.]+)\s+([-\w]+)') {
				$ipAddress = $matches[1]
				$macAddress = $matches[2]
				$type = $matches[3]

				# Resolve hostname
				$hostName = try {
					[System.Net.Dns]::GetHostEntry($ipAddress).HostName
				}
				catch {
					'Unknown'
				}

				# Output as PSCustomObject
				[pscustomobject]@{
					IPAddress  = $ipAddress
					MacAddress = $macAddress
					Type       = $type
					HostName   = $hostName
				}
			}
		}

		# Display the results
		$arpEntries | Format-Table -AutoSize
	}
	catch {
		Write-Verbose 'An error occurred while retrieving ARP table entries.' -Verbose
	}
}



# PowerShell function that retrieves all DNS records for a given domain and lists them in a table format:
function Get-AllDNSRecords {
	param(
		[Parameter(Mandatory = $true)]
		[string]$Domain
	)

	$recordTypes = @('A', 'AAAA', 'CNAME', 'MX', 'NS', 'SOA', 'TXT', 'SRV', 'PTR', 'CAA')

	$dnsRecords = @()

	foreach ($type in $recordTypes) {
		try {
			$records = Resolve-DnsName -Name $Domain -Type $type -ErrorAction Stop
			foreach ($record in $records) {
				$data = switch ($record.Type) {
					'A' { $record.IPv4Address }
					'AAAA' { $record.IPv6Address }
					'CNAME' { $record.AliasName }
					'MX' { "$($record.Preference) $($record.Exchange)" }
					'NS' { $record.NameHost }
					'SOA' { "$($record.MName) $($record.RName) $($record.SerialNumber)" }
					'TXT' { $record.Text }
					'SRV' { "$($record.Priority) $($record.Weight) $($record.Port) $($record.Target)" }
					'PTR' { $record.PTRDomainName }
					'CAA' { "$($record.Flags) $($record.Tag) $($record.Value)" }
					default { $null }
				}

				$dnsRecords += [pscustomobject]@{
					Name = $record.Name
					Type = $record.Type
					TTL  = $record.TTL
					Data = $data
				}
			}
		}
		catch {
			Write-Verbose "Error resolving $type records for $Domain" -Verbose
		}
	}

	# Sort by Name and Type for better readability
	$dnsRecords | Sort-Object Name, Type | Format-Table -AutoSize
}


# PowerShell function to query various DNS records for a domain, including A, AAAA, MX, TXT, SPF, DKIM, DMARC, and other service records like _sip._tcp, etc. This function will use Resolve-DnsName to fetch these records and format them into a nice table.
function Get-DnsRecords {
	param(
		[string]$Domain = 'example.com' # Change this to your target domain
	)

	Write-Host "Fetching DNS records for $Domain..." -ForegroundColor Yellow

	# Initialize an array to hold all results
	$dnsRecords = @()

	# A records (IPv4 addresses)
	try {
		$aRecords = Resolve-DnsName -Name $Domain -Type A -ErrorAction Stop
		foreach ($record in $aRecords) {
			$dnsRecords += [pscustomobject]@{
				RecordType = 'A'
				Name       = $Domain
				Value      = $record.IPAddress
			}
		}
	}
 catch {
		Write-Host "Failed to fetch A records: $($_.Exception.Message)" -ForegroundColor Red
	}

	# AAAA records (IPv6 addresses)
	try {
		$aaaaRecords = Resolve-DnsName -Name $Domain -Type AAAA -ErrorAction Stop
		foreach ($record in $aaaaRecords) {
			$dnsRecords += [pscustomobject]@{
				RecordType = 'AAAA'
				Name       = $Domain
				Value      = $record.IPAddress
			}
		}
	}
 catch {
		Write-Host "Failed to fetch AAAA records: $($_.Exception.Message)" -ForegroundColor Red
	}

	# MX records (Mail exchange servers)
	try {
		$mxRecords = Resolve-DnsName -Name $Domain -Type MX -ErrorAction Stop
		foreach ($record in $mxRecords) {
			$dnsRecords += [pscustomobject]@{
				RecordType = 'MX'
				Name       = $Domain
				Value      = "$($record.Exchange) with priority $($record.Preference)"
			}
		}
	}
 catch {
		Write-Host "Failed to fetch MX records: $($_.Exception.Message)" -ForegroundColor Red
	}

	# TXT records (including SPF, DKIM, DMARC, etc.)
	try {
		$txtRecords = Resolve-DnsName -Name $Domain -Type TXT -ErrorAction Stop
		foreach ($record in $txtRecords) {
			$dnsRecords += [pscustomobject]@{
				RecordType = 'TXT'
				Name       = $Domain
				Value      = $record.Text
			}
		}
	}
 catch {
		Write-Host "Failed to fetch TXT records: $($_.Exception.Message)" -ForegroundColor Red
	}

	# Service records (for example _sip._tcp for SIP servers)
	try {
		$serviceRecords = Resolve-DnsName -Name $Domain -Type SRV -ErrorAction Stop
		foreach ($record in $serviceRecords) {
			$dnsRecords += [pscustomobject]@{
				RecordType = 'SRV'
				Name       = $Domain
				Value      = "$($record.Name) with priority $($record.Priority), weight $($record.Weight), port $($record.Port)"
			}
		}
	}
 catch {
		Write-Host "Failed to fetch SRV records: $($_.Exception.Message)" -ForegroundColor Red
	}

	# DMARC record (_dmarc)
	try {
		$dmarcRecord = Resolve-DnsName -Name "_dmarc.$Domain" -Type TXT -ErrorAction Stop
		foreach ($record in $dmarcRecord) {
			$dnsRecords += [pscustomobject]@{
				RecordType = 'DMARC'
				Name       = "_dmarc.$Domain"
				Value      = $record.Text
			}
		}
	}
 catch {
		Write-Host "Failed to fetch DMARC records: $($_.Exception.Message)" -ForegroundColor Red
	}

	# DKIM record (_domainkey)
	try {
		$dkimRecord = Resolve-DnsName -Name "default._domainkey.$Domain" -Type TXT -ErrorAction Stop
		foreach ($record in $dkimRecord) {
			$dnsRecords += [pscustomobject]@{
				RecordType = 'DKIM'
				Name       = "default._domainkey.$Domain"
				Value      = $record.Text
			}
		}
	}
 catch {
		Write-Host "Failed to fetch DKIM records: $($_.Exception.Message)" -ForegroundColor Red
	}

	# Format the results into a nice table
	if ($dnsRecords.Count -gt 0) {
		Write-Host "DNS Records for $($Domain):" -ForegroundColor Green
		$dnsRecords | Format-Table -AutoSize
	}
 else {
		Write-Host "No DNS records found for $Domain." -ForegroundColor Red
	}
}

# Example usage:
# Get-DnsRecords -Domain "yourdomain.com"

function Get-Elevation {
	try {
		# Check if the script is running on Windows
		if ($PSVersionTable.PSEdition -eq 'Desktop' -or $PSVersionTable.Platform -eq 'Win32NT' -or $PSVersionTable.PSVersion.Major -le 5) {
			# Get the current principal
			$currentPrincipal = New-Object System.Security.Principal.WindowsPrincipal (
				[System.Security.Principal.WindowsIdentity]::GetCurrent()
			)

			# Check if the current principal is in the Administrators role
			$administratorsRole = [System.Security.Principal.WindowsBuiltInRole]::Administrator
			$isElevated = $currentPrincipal.IsInRole($administratorsRole)

			if ($isElevated) {
				Write-Host 'The script is running with elevated privileges.' -ForegroundColor Green
			}
			else {
				Write-Host 'The script is not running with elevated privileges.' -ForegroundColor Yellow
			}

			return $isElevated
		}

		# Check if the script is running on Unix
		if ($PSVersionTable.Platform -eq 'Unix') {
			$isRoot = ($env:USER -eq 'root')

			if ($isRoot) {
				Write-Host 'The script is running with root privileges.' -ForegroundColor Green
			}
			else {
				Write-Host 'The script is not running with root privileges.' -ForegroundColor Yellow
			}

			return $isRoot
		}
	}
	catch {
		Write-Host "An error occurred: $($_.Exception.Message)" -ForegroundColor Red
	}
}

# Example usage:
# $isElevated = Get-Elevation
# if ($isElevated) {
#     Write-Host "You have elevated privileges." -ForegroundColor Green
# } else {
#     Write-Host "You do not have elevated privileges." -ForegroundColor Yellow
# }

# powershell compatibility Functions

function AddWinRMTrustLocalHost {
	[CmdletBinding()]
	param(
		[Parameter(Mandatory = $False)]
		[string]$NewRemoteHost = 'localhost'
	)

	# Ensure WinRM is Enabled and Running on $env:ComputerName
	try {
		Write-Host 'Enabling PSRemoting...' -ForegroundColor Yellow
		$null = Enable-PSRemoting -Force -ErrorAction Stop
		Write-Host 'PSRemoting enabled successfully.' -ForegroundColor Green
	}
	catch {
		Write-Host 'PSRemoting enable failed. Attempting to configure network settings...' -ForegroundColor Red
		if ($PSVersionTable.PSEdition -eq 'Core') {
			Import-WinModule NetConnection
		}

		$NICsWithPublicProfile = Get-NetConnectionProfile | Where-Object { $_.NetworkCategory -eq 0 }
		if ($NICsWithPublicProfile.Count -gt 0) {
			foreach ($Nic in $NICsWithPublicProfile) {
				Set-NetConnectionProfile -InterfaceIndex $Nic.InterfaceIndex -NetworkCategory 'Private'
			}
		}

		try {
			Write-Host 'Retrying to enable PSRemoting...' -ForegroundColor Yellow
			$null = Enable-PSRemoting -Force
			Write-Host 'PSRemoting enabled successfully.' -ForegroundColor Green
		}
		catch {
			Write-Host "Enable-PSRemoting failed again: $($_.Exception.Message)" -ForegroundColor Red
			Write-Host 'Problem with Enable-PSRemoting WinRM Quick Config! Halting!' -ForegroundColor Red
			return
		}
	}

	# Add registry entry if not part of a Domain
	if (!(Get-CimInstance Win32_Computersystem).PartOfDomain) {
		Write-Host 'Adding LocalAccountTokenFilterPolicy registry entry...' -ForegroundColor Yellow
		$null = reg add HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System /v LocalAccountTokenFilterPolicy /t REG_DWORD /d 1 /f
		Write-Host 'Registry entry added successfully.' -ForegroundColor Green
	}

	# Add the New Server's IP Addresses to TrustedHosts
	Write-Host 'Updating TrustedHosts...' -ForegroundColor Yellow
	$CurrentTrustedHosts = (Get-Item WSMan:\localhost\Client\TrustedHosts).Value -split ','
	$HostsToAdd = @($NewRemoteHost)

	foreach ($Host in $HostsToAdd) {
		if ($CurrentTrustedHosts -notcontains $Host) {
			$CurrentTrustedHosts += $Host
		}
		else {
			Write-Host "Current WinRM Trusted Hosts Config already includes $Host" -ForegroundColor Yellow
			return
		}
	}

	$UpdatedTrustedHosts = $CurrentTrustedHosts | Where-Object { ![string]::IsNullOrWhiteSpace($_) } -join ','
	Set-Item WSMan:\localhost\Client\TrustedHosts $UpdatedTrustedHosts -Force
	Write-Host 'TrustedHosts updated successfully.' -ForegroundColor Green
}

# Example usage:
# AddWinRMTrustLocalHost -NewRemoteHost '192.168.1.1'
