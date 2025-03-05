BeforeAll {
	Import-Module -Name 'C:\Users\Nick\Dropbox\PC (2)\Documents\GitHub\UserStyles\Microsoft.PowerShell_profile.ps1'
}

#region Tests for ghcs function
Describe "ghcs" {
	It "Should define the ghcs function" {
		Get-Command ghcs -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for ghce function
Describe "ghce" {
	It "Should define the ghce function" {
		Get-Command ghce -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Remove-Images function
Describe "Remove-Images" {
	It "Should define the Remove-Images function" {
		Get-Command Remove-Images -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Clear-Temp function
Describe "Clear-Temp" {
	It "Should define the Clear-Temp function" {
		Get-Command Clear-Temp -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-LastRun function
Describe "Get-LastRun" {
	It "Should define the Get-LastRun function" {
		Get-Command Get-LastRun -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
Describe "Get-IPAddress" {
	It "Should define the Get-IPAddress function" {
		Get-Command Get-IPAddress -CommandType Function | Should -Not -BeNullOrEmpty
	}
	It "Should return an IP Address" {
		 (Get-IPAddress) -match  '^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$'
	}
}
#endregion

#region Tests for Get-DiskUsage function
#endregion

#region Tests for Get-DiskUsage function
Describe "Get-DiskUsage" {
	It "Should define the Get-DiskUsage function" {
		Get-Command Get-DiskUsage -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Restart-Service function
Describe "Restart-Service" {
	It "Should define the Restart-Service function" {
		Get-Command Restart-Service -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Show-FileSize function
Describe "Show-FileSize" {
	It "Should define the Show-FileSize function" {
		Get-Command Show-FileSize -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Convert-Size function
Describe "Convert-Size" {
	It "Should define the Convert-Size function" {
		Get-Command Convert-Size -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Find-ProcessByName function
Describe "Find-ProcessByName" {
	It "Should define the Find-ProcessByName function" {
		Get-Command Find-ProcessByName -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Start-Task function
Describe "Start-Task" {
	It "Should define the Start-Task function" {
		Get-Command Start-Task -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-ProcessInfo function
Describe "Get-ProcessInfo" {
	It "Should define the Get-ProcessInfo function" {
		Get-Command Get-ProcessInfo -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Clear-EventLogs function
Describe "Clear-EventLogs" {
	It "Should define the Clear-EventLogs function" {
		Get-Command Clear-EventLogs -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-ComputerInfo function
Describe "Get-ComputerInfo" {
	It "Should define the Get-ComputerInfo function" {
		Get-Command Get-ComputerInfo -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Find-LargestFiles function
Describe "Find-LargestFiles" {
	It "Should define the Find-LargestFiles function" {
		Get-Command Find-LargestFiles -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-UserAccount function
Describe "Get-UserAccount" {
	It "Should define the Get-UserAccount function" {
		Get-Command Get-UserAccount -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Export-ProcessList function
Describe "Export-ProcessList" {
	It "Should define the Export-ProcessList function" {
		Get-Command Export-ProcessList -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-ServiceStatus function
Describe "Get-ServiceStatus" {
	It "Should define the Get-ServiceStatus function" {
		Get-Command Get-ServiceStatus -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Start-ProcessAsAdmin function
Describe "Start-ProcessAsAdmin" {
	It "Should define the Start-ProcessAsAdmin function" {
		Get-Command Start-ProcessAsAdmin -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-FileHash function
Describe "Get-FileHash" {
	It "Should define the Get-FileHash function" {
		Get-Command Get-FileHash -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Register-Task function
Describe "Register-Task" {
	It "Should define the Register-Task function" {
		Get-Command Register-Task -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-InstalledSoftware function
Describe "Get-InstalledSoftware" {
	It "Should define the Get-InstalledSoftware function" {
		Get-Command Get-InstalledSoftware -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-NetworkInfo function
Describe "Get-NetworkInfo" {
	It "Should define the Get-NetworkInfo function" {
		Get-Command Get-NetworkInfo -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Show-DiskSpace function
Describe "Show-DiskSpace" {
	It "Should define the Show-DiskSpace function" {
		Get-Command Show-DiskSpace -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Stop-ProcessByName function
Describe "Stop-ProcessByName" {
	It "Should define the Stop-ProcessByName function" {
		Get-Command Stop-ProcessByName -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Convert-ToHtml function
Describe "Convert-ToHtml" {
	It "Should define the Convert-ToHtml function" {
		Get-Command Convert-ToHtml -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-SystemUptime function
Describe "Get-SystemUptime" {
	It "Should define the Get-SystemUptime function" {
		Get-Command Get-SystemUptime -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-ProcessCPUUsage function
Describe "Get-ProcessCPUUsage" {
	It "Should define the Get-ProcessCPUUsage function" {
		Get-Command Get-ProcessCPUUsage -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Export-EventLogs function
Describe "Export-EventLogs" {
	It "Should define the Export-EventLogs function" {
		Get-Command Export-EventLogs -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Send-Email function
Describe "Send-Email" {
	It "Should define the Send-Email function" {
		Get-Command Send-Email -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Repair-All function
Describe "Repair-All" {
	It "Should define the Repair-All function" {
		Get-Command Repair-All -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for BootDate function
Describe "BootDate" {
	It "Should define the BootDate function" {
		Get-Command BootDate -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for WingetUpdate function
Describe "WingetUpdate" {
	It "Should define the WingetUpdate function" {
		Get-Command WingetUpdate -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for pretty function
Describe "pretty" {
	It "Should define the pretty function" {
		Get-Command pretty -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Clear-Clipboard function
Describe "Clear-Clipboard" {
	It "Should define the Clear-Clipboard function" {
		Get-Command Clear-Clipboard -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-RegistryValue function
Describe "Get-RegistryValue" {
	It "Should define the Get-RegistryValue function" {
		Get-Command Get-RegistryValue -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Show-DirectorySize function
Describe "Show-DirectorySize" {
	It "Should define the Show-DirectorySize function" {
		Get-Command Show-DirectorySize -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-Services function
Describe "Get-Services" {
	It "Should define the Get-Services function" {
		Get-Command Get-Services -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-SystemInfo function
Describe "Get-SystemInfo" {
	It "Should define the Get-SystemInfo function" {
		Get-Command Get-SystemInfo -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-EnvironmentVariables function
Describe "Get-EnvironmentVariables" {
	It "Should define the Get-EnvironmentVariables function" {
		Get-Command Get-EnvironmentVariables -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Backup-Files function
Describe "Backup-Files" {
	It "Should define the Backup-Files function" {
		Get-Command Backup-Files -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for editprofile function
Describe "editprofile" {
	It "Should define the editprofile function" {
		Get-Command editprofile -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Notepad++ function
Describe "Notepad++" {
	It "Should define the Notepad++ function" {
		Get-Command "Notepad++" -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Open-Code function
Describe "Open-Code" {
	It "Should define the Open-Code function" {
		Get-Command Open-Code -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-DirSize function
Describe "Get-DirSize" {
	It "Should define the Get-DirSize function" {
		Get-Command Get-DirSize -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-TopProcesses function
Describe "Get-TopProcesses" {
	It "Should define the Get-TopProcesses function" {
		Get-Command Get-TopProcesses -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Test-DiskSpace function
Describe "Test-DiskSpace" {
	It "Should define the Test-DiskSpace function" {
		Get-Command Test-DiskSpace -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Search-File function
Describe "Search-File" {
	It "Should define the Search-File function" {
		Get-Command Search-File -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-NetworkAdapterInfo function
Describe "Get-NetworkAdapterInfo" {
	It "Should define the Get-NetworkAdapterInfo function" {
		Get-Command Get-NetworkAdapterInfo -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Restart-Explorer function
Describe "Restart-Explorer" {
	It "Should define the Restart-Explorer function" {
		Get-Command Restart-Explorer -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Clear-TempFiles function
Describe "Clear-TempFiles" {
	It "Should define the Clear-TempFiles function" {
		Get-Command Clear-TempFiles -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Test-InternetConnection function
Describe "Test-InternetConnection" {
	It "Should define the Test-InternetConnection function" {
		Get-Command Test-InternetConnection -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Set-Wallpaper function
Describe "Set-Wallpaper" {
	It "Should define the Set-Wallpaper function" {
		Get-Command Set-Wallpaper -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Show-LastBootTime function
Describe "Show-LastBootTime" {
	It "Should define the Show-LastBootTime function" {
		Get-Command Show-LastBootTime -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Clear-RecycleBin function
Describe "Clear-RecycleBin" {
	It "Should define the Clear-RecycleBin function" {
		Get-Command Clear-RecycleBin -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Lock-Workstation function
Describe "Lock-Workstation" {
	It "Should define the Lock-Workstation function" {
		Get-Command Lock-Workstation -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Watch-LogFile function
Describe "Watch-LogFile" {
	It "Should define the Watch-LogFile function" {
		Get-Command Watch-LogFile -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Search-InFiles function
Describe "Search-InFiles" {
	It "Should define the Search-InFiles function" {
		Get-Command Search-InFiles -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-File function
Describe "Get-File" {
	It "Should define the Get-File function" {
		Get-Command Get-File -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Test-WebsiteStatus function
Describe "Test-WebsiteStatus" {
	It "Should define the Test-WebsiteStatus function" {
		Get-Command Test-WebsiteStatus -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-IPFromHostname function
Describe "Get-IPFromHostname" {
	It "Should define the Get-IPFromHostname function" {
		Get-Command Get-IPFromHostname -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Compress-OldFiles function
Describe "Compress-OldFiles" {
	It "Should define the Compress-OldFiles function" {
		Get-Command Compress-OldFiles -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Watch-SystemUsage function
Describe "Watch-SystemUsage" {
	It "Should define the Watch-SystemUsage function" {
		Get-Command Watch-SystemUsage -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Send-SystemInfoEmail function
Describe "Send-SystemInfoEmail" {
	It "Should define the Send-SystemInfoEmail function" {
		Get-Command Send-SystemInfoEmail -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Backup-And-Compress function
Describe "Backup-And-Compress" {
	It "Should define the Backup-And-Compress function" {
		Get-Command Backup-And-Compress -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Test-SystemUptime function
Describe "Test-SystemUptime" {
	It "Should define the Test-SystemUptime function" {
		Get-Command Test-SystemUptime -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Update-WindowsDefender function
Describe "Update-WindowsDefender" {
	It "Should define the Update-WindowsDefender function" {
		Get-Command Update-WindowsDefender -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Test-NetworkLatency function
Describe "Test-NetworkLatency" {
	It "Should define the Test-NetworkLatency function" {
		Get-Command Test-NetworkLatency -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-SecurityAuditLogs function
Describe "Get-SecurityAuditLogs" {
	It "Should define the Get-SecurityAuditLogs function" {
		Get-Command Get-SecurityAuditLogs -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-DiskUsageReport function
Describe "Get-DiskUsageReport" {
	It "Should define the Get-DiskUsageReport function" {
		Get-Command Get-DiskUsageReport -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for cdgithub function
Describe "cdgithub" {
	It "Should define the cdgithub function" {
		Get-Command cdgithub -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-SystemInformationReport function
Describe "Get-SystemInformationReport" {
	It "Should define the Get-SystemInformationReport function" {
		Get-Command Get-SystemInformationReport -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Test-WebsiteResponse function
Describe "Test-WebsiteResponse" {
	It "Should define the Test-WebsiteResponse function" {
		Get-Command Test-WebsiteResponse -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Invoke-Traceroute function
Describe "Invoke-Traceroute" {
	It "Should define the Invoke-Traceroute function" {
		Get-Command Invoke-Traceroute -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Test-Port function
Describe "Test-Port" {
	It "Should define the Test-Port function" {
		Get-Command Test-Port -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Test-MultiHostLatency function
Describe "Test-MultiHostLatency" {
	It "Should define the Test-MultiHostLatency function" {
		Get-Command Test-MultiHostLatency -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-SSLCertificateExpiry function
Describe "Get-SSLCertificateExpiry" {
	It "Should define the Get-SSLCertificateExpiry function" {
		Get-Command Get-SSLCertificateExpiry -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Find-LocalNetworkDevices function
Describe "Find-LocalNetworkDevices" {
	It "Should define the Find-LocalNetworkDevices function" {
		Get-Command Find-LocalNetworkDevices -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Find-LocalNetworkDevicesSimple function
Describe "Find-LocalNetworkDevicesSimple" {
	It "Should define the Find-LocalNetworkDevicesSimple function" {
		Get-Command Find-LocalNetworkDevicesSimple -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-ARPTableDevices function
Describe "Get-ARPTableDevices" {
	It "Should define the Get-ARPTableDevices function" {
		Get-Command Get-ARPTableDevices -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Find-DevicesWithNmap function
Describe "Find-DevicesWithNmap" {
	It "Should define the Find-DevicesWithNmap function" {
		Get-Command Find-DevicesWithNmap -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Find-LocalNetworkNeighbors function
Describe "Find-LocalNetworkNeighbors" {
	It "Should define the Find-LocalNetworkNeighbors function" {
		Get-Command Find-LocalNetworkNeighbors -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Find-mDNSDevices function
Describe "Find-mDNSDevices" {
	It "Should define the Find-mDNSDevices function" {
		Get-Command Find-mDNSDevices -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-NetworkDeviceMap function
Describe "Get-NetworkDeviceMap" {
	It "Should define the Get-NetworkDeviceMap function" {
		Get-Command Get-NetworkDeviceMap -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-AllDNSRecords function
Describe "Get-AllDNSRecords" {
	It "Should define the Get-AllDNSRecords function" {
		Get-Command Get-AllDNSRecords -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-DnsRecords function
Describe "Get-DnsRecords" {
	It "Should define the Get-DnsRecords function" {
		Get-Command Get-DnsRecords -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for Get-Elevation function
Describe "Get-Elevation" {
	It "Should define the Get-Elevation function" {
		Get-Command Get-Elevation -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion

#region Tests for AddWinRMTrustLocalHost function
Describe "AddWinRMTrustLocalHost" {
	It "Should define the AddWinRMTrustLocalHost function" {
		Get-Command AddWinRMTrustLocalHost -CommandType Function | Should -Not -BeNullOrEmpty
	}
}
#endregion
