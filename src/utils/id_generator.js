class IDGenerator {
    constructor(workerId, epoch = 0) {
        this.workerId = workerId;
        this.epoch = epoch;

        if (workerId < 0 || workerId >= 1024) {
            throw new Error('Worker ID must be between 0 and 1023.');
        }

        this.sequence = 0;
        this.lastTimestamp = -1;
    }

    generate() {
        let timestamp = Date.now() - this.epoch;

        if (timestamp === this.lastTimestamp) {
            this.sequence = (this.sequence + 1) & 4095; // 12-bit sequence
            if (this.sequence === 0) {
                // Sequence overflow, wait for next millisecond
                while (timestamp <= this.lastTimestamp) {
                    timestamp = Date.now() - this.epoch;
                }
            }
        } else {
            this.sequence = 0;
        }

        if (timestamp < this.lastTimestamp) {
            throw new Error('Clock is moving backwards. Rejecting requests.');
        }

        this.lastTimestamp = timestamp;

        const id =
            (BigInt(timestamp) % 1000000000n) * 10000n +
            (BigInt(this.workerId) % 1000n) * 10n +
            BigInt(this.sequence);

        return id.toString();
    }
}

module.exports = IDGenerator